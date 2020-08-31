const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  target: "node",
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
  ],
};
