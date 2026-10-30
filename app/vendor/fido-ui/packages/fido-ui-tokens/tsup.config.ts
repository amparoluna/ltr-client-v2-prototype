import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/native.ts', 'src/fido-ui-theme-v3.generated.ts'],
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
  clean: true,
});
