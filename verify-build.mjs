import { readFile, readdir, access } from 'node:fs/promises';
import { join, resolve, relative, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
const allFiles = await walk(root);
const pages = allFiles.filter(file => file.endsWith('.html'));
const failures = [];
let references = 0;
const routeFile = path => {
  const clean = decodeURIComponent(path).replace(/^\/+/, '');
  return resolve(root, clean.endsWith('/') || !clean ? `${clean}index.html` : /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/index.html`);
};
const texts = new Map(await Promise.all(pages.map(async file => [file, await readFile(file, 'utf8')])));
for (const [file, html] of texts) {
  const label = relative(root, file);
  const route = '/' + label.split(sep).join('/').replace(/index\.html$/, '');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${label}: expected one primary heading`);
  assert.match(html, /<title>[^<]+<\/title>/, `${label}: missing title`);
  assert.match(html, /<html[^>]+lang="en"/, `${label}: missing language`);
  assert.match(html, /name="description" content="[^"]+"/, `${label}: missing description`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
    const url = new URL(value, `http://portfolio.test${route}`);
    const target = routeFile(url.pathname);
    if (!target.startsWith(root + sep) && target !== root) { failures.push(`${label}: outside-root reference ${value}`); continue; }
    try {
      await access(target);
      if (url.hash && target.endsWith('.html')) {
        const destination = texts.get(target) ?? await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!destination.includes(`id="${id}"`)) failures.push(`${label}: missing anchor ${value}`);
      }
    } catch { failures.push(`${label}: missing file for ${value}`); }
    references++;
  }
}
assert.equal(pages.length, 8, 'Expected homepage, work index, five case studies, and 404');
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`Verified ${pages.length} HTML pages and ${references} local file/anchor references.`);

const origin = process.argv.find(arg => arg.startsWith('--url='))?.slice(6);
if (origin) {
  for (const file of pages) {
    const path = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
    const response = await fetch(new URL(path, origin));
    const expected = path === '/404.html' ? 404 : 200;
    assert.equal(response.status, expected, `${path}: unexpected HTTP status`);
    const body = await response.text();
    assert.match(body, /<h1(?:\s|>)/, `${path}: page did not render`);
    console.log(`HTTP ${response.status} ${path}`);
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/favicon.svg']) {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200, `${path}: failed to serve`);
  }
}
