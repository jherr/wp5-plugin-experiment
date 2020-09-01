import * as path from "path";
import * as fs from "fs";

declare var __webpack_share_scopes__: any;
declare var __webpack_init_sharing__: any;
declare var __non_webpack_require__: any;

type Container = { get: (name: string) => Promise<any> };

export default async (
  dir: string,
  moduleName: string = "./plugin",
  remoteEntry: string = "remoteEntry.js"
): Promise<any[]> => {
  const importAll = async (files: string[]) => {
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

  const containers = await importAll(
    fs.readdirSync(dir).map((d) => path.resolve(`${dir}/${d}/${remoteEntry}`))
  );

  return await Promise.all(
    (containers as Container[]).map((plugin) =>
      plugin.get(moduleName).then((factory: () => any): any => factory())
    )
  );
};
