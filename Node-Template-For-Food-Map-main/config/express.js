const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");

module.exports = function () {
  const app = express();
  /* 미들웨어 설정 */
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cors());
  app.use(express.static("/home/ubuntu/food-map/front"));
  // app.use(express.static(process.cwd() + '/public'));

  /* 직접 구현해야하는 모듈 */
  require("../src/routes/indexRoute")(app);

  return app;
};
