module.exports = () => {
  import("./world").then((module) => {
    return module.default;
  });
};
