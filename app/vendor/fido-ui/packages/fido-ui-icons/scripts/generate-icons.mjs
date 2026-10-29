import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const assetsRoot = join(packageRoot, 'assets');
const sourceRoot = join(packageRoot, 'src');
const checkOnly = process.argv.includes('--check');
const categories = JSON.parse(await readFile(join(assetsRoot, 'manifest.json'), 'utf8'));

function toPascalCase(value) {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join('');
}

function replaceAll(value, search, replacement) {
  return value.split(search).join(replacement);
}

function svgBodyToJsx(svg, file, component, preserveColor) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  let body = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];

  if (!viewBox || !body) {
    throw new Error(`${file} must be an SVG with a viewBox`);
  }

  const referencedIds = new Set([...body.matchAll(/url\(#([^)]+)\)/g)].map((match) => match[1]));
  const iconPrefix = component
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

  for (const match of body.matchAll(/\sid="([^"]+)"/g)) {
    const id = match[1];
    if (referencedIds.has(id)) {
      const nextId = `${iconPrefix}-${id.replace(/[^A-Za-z0-9_-]+/g, '-').toLowerCase()}`;
      body = replaceAll(body, `id="${id}"`, `id="${nextId}"`);
      body = replaceAll(body, `url(#${id})`, `url(#${nextId})`);
    } else {
      body = replaceAll(body, ` id="${id}"`, '');
    }
  }

  const attributeNames = {
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'fill-rule': 'fillRule',
    'stop-color': 'stopColor',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-width': 'strokeWidth',
  };

  for (const [svgName, jsxName] of Object.entries(attributeNames)) {
    body = body.replace(new RegExp(`${svgName}=`, 'g'), `${jsxName}=`);
  }

  if (!preserveColor) {
    body = body.replace(/(fill|stroke)="#404040"/gi, '$1="currentColor"');
  }

  return { viewBox, body: body.trim() };
}

function iconSource(component, body, viewBox) {
  const viewBoxArgument = viewBox === '0 0 24 24' ? '' : `,\n  '${viewBox}'`;
  return `// Generated from the FidoUI icon asset catalog. Do not edit by hand.\nimport { createIcon } from '../create-icon';\n\nexport const ${component} = /* @__PURE__ */ createIcon(\n  '${component}',\n  <>\n${body}\n  </>${viewBoxArgument},\n);\n`;
}

const failures = [];
const categoryResults = [];
const categoryProxySources = [];

for (const { name, directory, icons: manifest } of categories) {
  const assetsDir = join(assetsRoot, directory);
  const outputDir = join(sourceRoot, directory);
  const assetFiles = (await readdir(assetsDir)).filter((file) => file.endsWith('.svg')).sort();
  const manifestFiles = manifest.map(({ file }) => file).sort();
  const componentNames = manifest.map(({ component }) => component);

  if (new Set(manifestFiles).size !== manifestFiles.length) {
    throw new Error(`The ${name} asset manifest contains duplicate files`);
  }

  if (new Set(componentNames).size !== componentNames.length) {
    throw new Error(`The ${name} asset manifest contains duplicate component names`);
  }

  if (JSON.stringify(assetFiles) !== JSON.stringify(manifestFiles)) {
    throw new Error(`Every ${name} SVG asset must appear exactly once in its manifest`);
  }

  if (!checkOnly) await mkdir(outputDir, { recursive: true });

  const expectedFiles = new Set(['index.ts']);
  const exports = [];

  for (const { file, component } of manifest) {
    if (!/^[A-Z][A-Za-z0-9]*Icon$/.test(component)) {
      throw new Error(`Invalid component name: ${component}`);
    }

    const outputFile = file.replace(/\.svg$/, '.tsx');
    expectedFiles.add(outputFile);
    exports.push(`export { ${component} } from './${file.replace(/\.svg$/, '')}';`);

    const svg = await readFile(join(assetsDir, file), 'utf8');
    const { body, viewBox } = svgBodyToJsx(
      svg,
      `${directory}/${file}`,
      component,
      directory === 'payment-methods',
    );
    const source = iconSource(component, body, viewBox);
    const destination = join(outputDir, outputFile);

    if (checkOnly) {
      const current = await readFile(destination, 'utf8').catch(() => '');
      if (current !== source) failures.push(`${directory}/${outputFile}`);
    } else {
      await writeFile(destination, source);
    }
  }

  const indexSource = `${exports.join('\n')}\n`;
  const indexPath = join(outputDir, 'index.ts');

  if (checkOnly) {
    const current = await readFile(indexPath, 'utf8').catch(() => '');
    if (current !== indexSource) failures.push(`${directory}/index.ts`);

    const existingFiles = await readdir(outputDir).catch(() => []);
    const unexpected = existingFiles.filter(
      (file) =>
        (file.endsWith('.tsx') || file === 'index.ts') &&
        !file.endsWith('.test.tsx') &&
        !expectedFiles.has(file),
    );
    failures.push(...unexpected.map((file) => `unexpected:${directory}/${file}`));
  } else {
    await writeFile(indexPath, indexSource);
  }

  categoryResults.push({
    name,
    directory,
    namespace: `${toPascalCase(directory)}Icons`,
    count: manifest.length,
    components: componentNames,
  });
  categoryProxySources.push([`${directory}.ts`, `export * from './${directory}/index';\n`]);
}

const directExportCategories = new Set(categoryResults.map(({ directory }) => directory));
const directExports = categoryResults
  .filter(({ directory }) => directExportCategories.has(directory) && directory !== 'utility')
  .map(({ directory }) => `export * from './${directory}/index';`)
  .join('\n');
const utilityComponents = categoryResults.find(({ directory }) => directory === 'utility')?.components ?? [];
const utilityAliases = `export {\n${utilityComponents
  .map((component) => {
    const exportName = ['HomeIcon', 'ShareIcon', 'ShareBoldIcon'].includes(component)
      ? `  ${component} as Utility${component}`
      : `  ${component}`;
    return `${exportName},`;
  })
  .join('\n')}\n} from './utility/index';`;
const rootIndexSource = `export type { IconComponent, IconProps } from './create-icon';\nexport { iconCategories, iconCount } from './catalog';\nexport type { IconCatalogCategory } from './catalog';\n${directExports}\n${utilityAliases}\n${categoryResults.map(({ directory, namespace }) => `export * as ${namespace} from './${directory}/index';`).join('\n')}\n`;
const catalogSource = `import type { IconComponent } from './create-icon';\n${categoryResults.map(({ directory, namespace }) => `import * as ${namespace} from './${directory}/index';`).join('\n')}\n\nexport interface IconCatalogCategory {\n  name: string;\n  slug: string;\n  icons: Record<string, IconComponent>;\n}\n\nexport const iconCategories: IconCatalogCategory[] = [\n${categoryResults.map(({ name, directory, namespace }) => `  { name: '${name}', slug: '${directory}', icons: ${namespace} },`).join('\n')}\n];\n\nexport const iconCount = ${categoryResults.reduce((total, category) => total + category.count, 0)};\n`;

for (const [file, source] of [
  ['index.ts', rootIndexSource],
  ['catalog.ts', catalogSource],
  ...categoryProxySources,
]) {
  const destination = join(sourceRoot, file);
  if (checkOnly) {
    const current = await readFile(destination, 'utf8').catch(() => '');
    if (current !== source) failures.push(file);
  } else {
    await writeFile(destination, source);
  }
}

if (checkOnly && failures.length > 0) {
  throw new Error(`Generated icon sources are out of date: ${failures.join(', ')}`);
}
