// Checks that every data-i18n key used in src exists in src/lib/i18n.ts dict.
// Usage: node scripts/i18n-check.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const src = join(root, 'src');

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(astro|tsx|ts)$/.test(f)) out.push(p);
  }
  return out;
}

const dictSrc = readFileSync(join(src, 'lib', 'i18n.ts'), 'utf8');
const defined = new Set(
  [...dictSrc.matchAll(/'([a-z0-9_.]+)'\s*:\s*\{/gi)].map((m) => m[1])
);

const used = new Map();
for (const file of walk(src)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/data-i18n="([^"]+)"/g)) {
    if (!used.has(m[1])) used.set(m[1], []);
    used.get(m[1]).push(file.replace(root, ''));
  }
  for (const m of text.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const part of m[1].split(';')) {
      const key = (part.split(':')[1] || '').trim();
      if (!key) continue;
      if (!used.has(key)) used.set(key, []);
      used.get(key).push(file.replace(root, ''));
    }
  }
  for (const m of text.matchAll(/(?<![\w$])t\(\s*'([^']+)'/g)) {
    if (!used.has(m[1])) used.set(m[1], []);
    used.get(m[1]).push(file.replace(root, ''));
  }
  for (const m of text.matchAll(/(?<![\w$])t\(\s*"([^"]+)"/g)) {
    if (!used.has(m[1])) used.set(m[1], []);
    used.get(m[1]).push(file.replace(root, ''));
  }
}

let missing = 0;
for (const [key, files] of used) {
  if (key.includes('{') || key.includes(' ')) continue;
  if (!defined.has(key)) {
    missing += 1;
    console.error(`missing key "${key}" used in:\n  ${files.join('\n  ')}`);
  }
}

const unused = [...defined].filter((k) => !used.has(k));
if (unused.length > 0) console.log(`unused keys (${unused.length}): ${unused.join(', ')}`);

if (missing > 0) {
  console.error(`\n${missing} missing i18n key(s).`);
  process.exit(1);
}
console.log(`OK — ${used.size} keys used, all defined.`);
