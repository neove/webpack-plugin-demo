// webpack plugin
const PLUGIN_NAME = "HelloPlgin";
const fs = require("fs");

module.exports = class HelloPlgin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
      // Create a header string for the generated file:
      var filelist = "In this build:\n\n";
      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }
      // Insert this list into the webpack build as a new file asset:
      compilation.assets["filelist.md"] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        },
      };
      callback();
    });
    compiler.hooks.entryOption.tap(PLUGIN_NAME, (context, entry) => {
      // context: /Users/beisen/github/webpack-plugin-demo
      // entry: "./test/index.js"
      console.log("entryOption");
    });
    compiler.hooks.afterPlugins.tap(PLUGIN_NAME, (compiler) => {
      console.log("afterPlugins");
    });
    compiler.hooks.normalModuleFactory.tap(
      PLUGIN_NAME,
      (normalModuleFactory) => {
        //
        console.log(normalModuleFactory);
      }
    );
    /**
     * thisCompilation hooks: Executed while initializing the compilation, right before emitting the compilation event.
     */
    compiler.hooks.thisCompilation.tap(
      PLUGIN_NAME,
      (compilation, compilationParams) => {
        compilation.hooks.optimizeChunks.tap(PLUGIN_NAME, (chunks) => {});
      }
    );
    compiler.hooks.shouldEmit.tap(PLUGIN_NAME, (compilation) => {});
  }
};
