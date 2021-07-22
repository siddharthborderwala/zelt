import * as esbuild from 'esbuild-wasm';
 
 /**
  * This is a plugin for resolving the paths for the dependencies
  * 
  * Es-build naturally looks through the file system for getting
  * the dependencies, since we are bundling in the browser, we need
  * to provide a path over the network from where we can get the
  * required code and dependencies.
  * 
  * One great service that does this is https://unpkg.com
  */
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // for index.js file
      build.onResolve({filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // for files with relative paths './' ro '../'
      build.onResolve({filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
        };
      });

      // some root package
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });
    },
  };
};