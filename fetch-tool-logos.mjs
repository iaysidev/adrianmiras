// Development helper: vendors only the selected brand SVGs, never a runtime CDN.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { toolGroups } from './src/data/tools.ts';

const versions = { logos: '1.2.17', 'simple-icons': '1.2.100' };
const collections = new Map();
await Promise.all(Object.entries(versions).map(async ([collection, version]) => {
  const url = `https://cdn.jsdelivr.net/npm/@iconify-json/${collection}@${version}/icons.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
  collections.set(collection, await response.json());
}));

if (process.argv.includes('--list')) {
  for (const [name, collection] of collections) {
    const pattern = /adobe|photoshop|illustrator|indesign|canva|lightroom|premiere|capcut|meta|jetpack|compose|kotlin|html-5|css-3|firebase|mysql|supabase/;
    console.log(`${name}@${versions[name]}: ${Object.keys(collection.icons).filter(key => pattern.test(key)).join(', ')}`);
  }
} else {
  const output = fileURLToPath(new URL('./public/images/logos/', import.meta.url));
  const assets = await Promise.all(toolGroups.flatMap(group => group.tools).map(async tool => {
    if (tool.sourceUrl) {
      const response = await fetch(tool.sourceUrl);
      if (!response.ok) throw new Error(`${response.status} fetching ${tool.sourceUrl}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (tool.extension === 'ico' && bytes.readUInt32LE(0) !== 65536) throw new Error(`Invalid ICO: ${tool.name}`);
      return { filename: `${tool.id}.${tool.extension}`, content: bytes, source: tool.sourceUrl };
    }
    const collectionName = tool.collection ?? 'logos';
    const collection = collections.get(collectionName);
    const icon = collection.icons[tool.icon];
    if (!icon) throw new Error(`Missing logo: ${collectionName}/${tool.icon} (${tool.name})`);
    const width = icon.width ?? collection.width ?? 16;
    const height = icon.height ?? collection.height ?? 16;
    const color = tool.color ?? '#17191C';
    const body = icon.body.replaceAll('currentColor', color);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 ${width} ${height}" fill="${color}" role="img"><title>${tool.name}</title>${body}</svg>\n`;
    return { filename: `${tool.id}.svg`, content: svg, source: `${collectionName}:${tool.icon}` };
  }));
  await mkdir(output, { recursive: true });
  await Promise.all(assets.map(asset => writeFile(new URL(`./public/images/logos/${asset.filename}`, import.meta.url), asset.content)));
  const credits = [
    '# Tool logo sources', '',
    'These assets identify the products in Adrian Miras’s toolkit. Brand names and marks belong to their respective owners.', '',
    'Locally vendored from the following pinned Iconify collections:', '',
    '- SVG Logos: https://github.com/gilbarbara/logos (CC0-1.0 collection; individual brand rights remain with their owners).',
    '- Simple Icons: https://github.com/simple-icons/simple-icons (CC0-1.0 collection; individual brand rights remain with their owners).',
    '- Iconify distribution: https://github.com/iconify/icon-sets',
    '- CapCut: original site icon from CapCut’s public asset CDN, as linked below.', '',
    ...Object.entries(versions).map(([collection, version]) => `- @iconify-json/${collection}@${version}`), '',
    '| Local file | Collection icon |', '| --- | --- |',
    ...assets.map(asset => `| ${asset.filename} | ${asset.source} |`), '',
    'Regenerate using `node fetch-tool-logos.mjs` from the project directory. The site itself does not fetch these collections.', '',
  ].join('\n');
  await writeFile(new URL('./public/images/logos/SOURCES.md', import.meta.url), credits);
  console.log(`Saved ${assets.length} local logos and their source credits.`);
}
