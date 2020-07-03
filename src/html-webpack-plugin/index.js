// 自己实现一个html webpack plugin
const myPlugin = { name: "htmlWebpackPlugin" };
module.exports = class {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(myPlugin, (compilation, callBack) => {
      const entryNames = Array.from(compilation.entrypoints.keys());
      const scriptsStr = entryNames.map((name) => {
        return `<script src="./${name}.js"></script>`;
      });

      const fileContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${scriptsStr.join("")}
      </head>
      <body>
        
      </body>
      </html>`;

      compilation.assets["index.html"] = {
        source: function () {
          return fileContent;
        },
        size: function () {
          return fileContent.length;
        },
      };
      callBack();
    });
  }
};
