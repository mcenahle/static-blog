import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const routes = ['index.html', 'subscribe/index.html', 'comment-picture-save-policy/index.html', 'privacy/index.html', '404.html'];
for (const route of routes) {
  const html = readFileSync(join('dist', route), 'utf8');
  assert(html.includes('lang="zh-CN"'), `${route}: language`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one h1`);
  assert(!/bootstrap|jquery|iconify|<iframe/i.test(html), `${route}: no legacy dependencies`);
  for (const [, href] of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    if (!href.startsWith('/')) continue;
    const file = href.endsWith('/') ? `${href}index.html` : href;
    assert(existsSync(join('dist', file)), `${route}: broken link ${href}`);
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`), `${route}: missing anchor ${id}`);
}
for (const name of ['subscribe', 'comment-picture-save-policy']) {
  const original = readFileSync(`resources/${name}.html`, 'utf8');
  const migrated = readFileSync(`dist/${name}/index.html`, 'utf8');
  for (const [, url] of original.matchAll(/href="(https:[^"]+)"/g)) {
    if (/cdnjs/.test(url)) continue;
    assert(migrated.includes(url), `${name}: missing original link ${url}`);
  }
}
assert(readFileSync('dist/subscribe/index.html','utf8').includes('https://blog.mcenahle.page/feed.xml'));
assert(readFileSync('dist/comment-picture-save-policy/index.html','utf8').includes('2GB'));
console.log(`Verified ${routes.length} pages: internal links, anchors, original external links, RSS and legacy dependency removal.`);
