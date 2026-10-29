import { defineConfig } from 'tsup';
import { readdirSync } from 'fs';

const componentDirs = readdirSync('./src/components');

export default defineConfig({
  entry: [
    'src/index.ts',
    ...componentDirs.map((d) => `src/components/${d}/index.ts`),
    'src/tokens/colors.ts',
    'src/tokens/fido-ui-theme-v3.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs',
    };
  },
  esbuildOptions(options, context) {
    if (context.format === 'esm') {
      options.outdir = 'dist/esm';
    } else {
      options.outdir = 'dist/cjs';
    }
  },
  external: ['react', 'react-dom', 'tailwindcss', '@heroicons/react', 'lucide-react'],
  clean: true,
});
