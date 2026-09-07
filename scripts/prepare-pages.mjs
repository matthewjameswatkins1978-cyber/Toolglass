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

for (const entry of fs.readdirSync(source)) {
  if (entry.startsWith('_') || entry.startsWith('.')) {
    continue;
  }
  if (entry.endsWith('.html') || entry.endsWith('.rsc')) {
    const route = entry.replace(/\.(html|rsc)$/, '');
    if (route === 'about' || route === 'reviews') {
      copyFile(entry, `${route}/index.${entry.endsWith('.html') ? 'html' : 'rsc'}`);
    }
  }
}

const reviews = path.join(source, 'reviews');
if (fs.existsSync(reviews)) {
  for (const entry of fs.readdirSync(reviews)) {
    const match = entry.match(/^(.*)\.(html|rsc)$/);
    if (match) {
      copyFile(`reviews/${entry}`, `reviews/${match[1]}/index.${match[2]}`);
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
