module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
  // app.get("/dummy", index.example);

  // 학생 테이블 조회
  // app.get("/NearFoodMap", index.NearFoodMap);

  // 주변 식당 목록
  app.get("/NearFoodMap_Jongrogu", index.readNearFoodMap_Jongrogu);
};
