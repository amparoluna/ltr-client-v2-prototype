import { readdirSync } from 'node:fs';
import { defineConfig } from 'tsup';

const categoryDirectories = readdirSync('./assets', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const categoryEntries = categoryDirectories.flatMap((directory) => [
  `src/${directory}.ts`,
  `src/${directory}/index.ts`,
  ...readdirSync(`./src/${directory}`)
    .filter((file) => file.endsWith('.tsx') && !file.endsWith('.test.tsx'))
    .map((file) => `src/${directory}/${file}`),
]);

export default defineConfig({
  entry: ['src/index.ts', 'src/catalog.ts', ...categoryEntries],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  outDir: 'dist',
  outExtension({ format }) {
    return { js: format === 'esm' ? '.js' : '.cjs' };
  },
  esbuildOptions(options, context) {
    options.outdir = context.format === 'esm' ? 'dist/esm' : 'dist/cjs';
  },
  external: ['react', 'react/jsx-runtime'],
  clean: true,
});
