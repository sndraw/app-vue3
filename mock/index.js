const home = require("./home");
const wechat = require("./wechat");
const test = require("./test");
const mock = (app) => {
  app.get("/api/home", home.index);
  app.get("/api/wechat", wechat.index);
  app.get("/api/wechat/config", wechat.config);
  app.get("/api/test", test.index);
};
module.exports = mock;
