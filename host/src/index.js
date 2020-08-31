const path = require('path')
console.log("Hello");

function importAll(contextLoader) {
  const allComponent = contextLoader.keys().reduce((acc, id) => {
    const cleanID = id.substr(1);
    acc.push(__non_webpack_require__(path.join('../plugins', cleanID)))

    return acc;
  }, []);
  return allComponent;
}

// could also use main.js, since it exposes the same thing as remotes do.
const contextLoader = require.context(
  "../plugins",
  true,
  /remoteEntry.js$/
);

const [plugin1] = importAll(contextLoader)
plugin1.get('./plugin').then(factory => factory()).then(({sample}) => {
  sample()
})
