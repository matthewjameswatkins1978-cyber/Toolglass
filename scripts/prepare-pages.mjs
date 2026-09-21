import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('dist/client');
const target = path.resolve('dist/pages');

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

function copyFile(relativeSource, relativeTarget = relativeSource) {
  const destination = path.join(target, relativeTarget);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(source, relativeSource), destination);
}

copyFile('index.html');
copyFile('index.rsc');
copyFile('favicon.svg');
copyFile('404.html');
for (const discoveryFile of ['sitemap.xml', 'robots.txt', 'feed.xml', 'atom.xml', 'indexnow-key.txt']) {
  if (fs.existsSync(path.join(source, discoveryFile))) copyFile(discoveryFile);
}
if (fs.existsSync(path.join(source, 'og'))) {
  fs.cpSync(path.join(source, 'og'), path.join(target, 'og'), { recursive: true });
}
for (const publicDirectory of ['art', 'radar']) {
  if (fs.existsSync(path.join(source, publicDirectory))) {
    fs.cpSync(path.join(source, publicDirectory), path.join(target, publicDirectory), { recursive: true });
  }
}

for (const entry of fs.readdirSync(source)) {
  if (entry.startsWith('_') || entry.startsWith('.')) {
    continue;
  }
  if (entry.endsWith('.html') || entry.endsWith('.rsc')) {
    const route = entry.replace(/\.(html|rsc)$/, '');
    if (route === 'about' || route === 'reviews' || route === 'submit' || route === 'radar' || route === 'articles') {
      copyFile(entry, `${route}/index.${entry.endsWith('.html') ? 'html' : 'rsc'}`);
    }
  }
}

for (const route of ['reviews', 'radar', 'articles']) {
  const routeDirectory = path.join(source, route);
  if (!fs.existsSync(routeDirectory)) continue;

  for (const entry of fs.readdirSync(routeDirectory)) {
    const match = entry.match(/^(.*)\.(html|rsc)$/);
    if (match) {
      copyFile(`${route}/${entry}`, `${route}/${match[1]}/index.${match[2]}`);
    }
  }
}

const prefixedAssets = path.join(source, 'Toolglass', '_next');
const assets = fs.existsSync(prefixedAssets)
  ? prefixedAssets
  : path.join(source, '_next');
fs.cpSync(assets, path.join(target, '_next'), { recursive: true });

for (const optional of ['_headers', '.assetsignore']) {
  if (fs.existsSync(path.join(source, optional))) {
    copyFile(optional);
  }
}

console.log(`Prepared GitHub Pages artifact at ${path.relative(process.cwd(), target)}`);
