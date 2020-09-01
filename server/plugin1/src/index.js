module.exports.setup = (app) => {
  app.get("/plugin1", function (req, res) {
    res.send("Hello from plugin 1");
  });
};
