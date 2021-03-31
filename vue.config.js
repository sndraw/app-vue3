module.exports = {
  devServer: {
    before(app) {
      if (process.env.NODE_ENV === "mock") {
        const mock = require("./mock");
        mock(app);
      }
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
};
