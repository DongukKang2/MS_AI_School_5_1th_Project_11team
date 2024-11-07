const { pool } = require("../../config/database");

exports.selectNearFoodMap_Jongrogu = async function (connection, category) {
  const selectAllNearFoodMap_JongroguQuery = `SELECT title, address, category FROM NearFoodMap_Jongrogu;`;
  const selectCategorizedNearFoodMap_JongroguQuery = `SELECT title, address, category FROM NearFoodMap_Jongrogu Where category = ?;`; // MySQL이 자동으로 파라미터 바인딩을 처리해줍니다
  
  const Params = [category];

  const Query = category 
    ? selectCategorizedNearFoodMap_JongroguQuery 
    : selectAllNearFoodMap_JongroguQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};
