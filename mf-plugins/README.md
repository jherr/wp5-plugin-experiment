Module Federation Plugin Helper
===============================

This is a helper for loading plugins that have been packaged as federated modules using Webpack 5's `ModuleFederationPlugin`. There is an [example plugin template](https://github.com/jherr/mf-plugin-template) you can use to create your first plugin.

# Installation

``` bash
npm install mf-plugins
```

Or

``` bash
yarn add mf-plugins
```

# Usage

``` javascript
import loadPlugins from "mf-plugins";

const plugins = await loadPlugins("../plugins");
```

There are three argments, the only one that is required is the first which is the relative path to your plugins folder where all of the *built* plugins reside. Not the plugin code, but the results of the Webpack'ing of the plugin code.

The two additional arguments are the exposed name, which is by default `./plugin` and the name of the remoteEntry file which is by default `remoteEntry.js`.

