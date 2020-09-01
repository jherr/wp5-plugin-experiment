const path = require('path')
console.log("Hello");

const importAll = async (contextLoader) => {
  if (__webpack_share_scopes__.default) {
    await __webpack_init_sharing__("default");
  }
  const allPlugins = contextLoader.keys().map((id) => {
    const cleanID = id.substr(1);
    return new Promise((resolve) => {
      const container = __non_webpack_require__(path.join('../plugins', cleanID))
      const initContainer = new Promise((resolve) => {
        if (__webpack_share_scopes__.default) {
          resolve(container.init(__webpack_share_scopes__.default))
        } else {
          resolve()
        }
      })
      initContainer.then(() => {
        resolve(container)
      })
    })
  })
  return Promise.all(allPlugins)
}

// could also use main.js, since it exposes the same thing as remotes do.
const contextLoader = require.context(
  "../plugins",
  true,
  /remoteEntry.js$/
);
//could try top-level awaits
const start = async () => {
  const [plugin1] = await importAll(contextLoader)
  plugin1.get('./plugin').then(factory => factory()).then(({sample}) => {
    sample()
  })
}

start()

