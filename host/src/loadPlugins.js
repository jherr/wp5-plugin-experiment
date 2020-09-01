const path = require("path");
const fs = require("fs");

module.exports = async (
  dir,
  moduleName = "./plugin",
  remoteEntry = "remoteEntry.js"
) => {
  const importAll = async (files) => {
    if (__webpack_share_scopes__.default) {
      await __webpack_init_sharing__("default");
    }
    return Promise.all(
      files.map(
        (remoteEntryFile) =>
          new Promise((remoteResolve) => {
            const container = __non_webpack_require__(remoteEntryFile);
            const initContainer = new Promise((containerResolve) => {
              if (__webpack_share_scopes__.default) {
                containerResolve(
                  container.init(__webpack_share_scopes__.default)
                );
              } else {
                containerResolve();
              }
            });
            initContainer.then(() => {
              remoteResolve(container);
            });
          })
      )
    );
  };

  const pluginDirectories = fs
    .readdirSync(dir)
    .map((d) => path.resolve(`${dir}/${d}/${remoteEntry}`));

  const containers = await importAll(pluginDirectories);

  return await Promise.all(
    containers.map((plugin) =>
      plugin.get(moduleName).then((factory) => factory())
    )
  );
};
