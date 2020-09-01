import loadPlugins from "mf-plugins";
import express from "express";

const app = express();

const start = async () => {
  const plugins = await loadPlugins("../plugins");

  plugins.forEach((plugin) => {
    plugin.setup(app);
  });

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.listen(3000);
};

start();
