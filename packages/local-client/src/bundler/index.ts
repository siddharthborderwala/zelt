import * as esbuild from 'esbuild-wasm';

import { fetchPlugin, unpkgPathPlugin } from './plugins';

export const startService = () =>
  esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.23/esbuild.wasm',
  });

type bundleResult = { code?: string; error?: Error };

export const bundle = async (rawCode: string): Promise<bundleResult> => {
  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [fetchPlugin(rawCode), unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    return { code: result.outputFiles[0].text };
  } catch (error) {
    return { error };
  }
};
