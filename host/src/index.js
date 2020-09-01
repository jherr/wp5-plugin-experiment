const loadPlugins = require("./loadPlugins");

console.log("Hello");

const start = async () => {
  const plugins = await loadPlugins("../plugins");
  plugins.forEach((plugin) => {
    plugin.sample();
  });
};

start();
