import * as esbuild from 'esbuild';
import { readFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

await esbuild.build({
	entryPoints: ['src/index.js'],
	bundle: true,
	format: 'iife',
	outfile: 'dist/pcc-richtext.js',
	define: {
		__VERSION__: JSON.stringify(pkg.version)
	}
});
