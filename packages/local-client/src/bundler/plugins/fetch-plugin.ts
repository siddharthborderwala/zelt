import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

/**
 * This plugin returns an object specifying the loader and the contents
 * 
 * Since we are bundling in the browser, we need to get the dependencies
 * from https://unpkg.com and use them in the app
 * 
 * We also cache the contents of the files we fetched in the IndexedDB
 * for faster load times
 * 
 * It can handle css and jsx files
 * 
 * @param codeSnippet The code that needs to be fetched and bundled
 */
export const fetchPlugin = (codeSnippet: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // all the onLoad functions are run one after another
      // esbuild returns once one of these functions returns

      build.onLoad({ filter: /(^index\.js$)/}, () => {
        return {
            loader: 'jsx',
            contents: codeSnippet,
          };
      });

      // for checking if the dependency is in the cache
      build.onLoad({ filter: /.*/}, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      })

      // for fetching css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'js',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });

      // for fetching js and jsx files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
}