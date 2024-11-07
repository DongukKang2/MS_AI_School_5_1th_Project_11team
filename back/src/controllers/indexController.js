const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

// 학생 테이블 조회
exports.readNearFoodMap_Jongrogu = async function(req, res) {
  const { category } = req.query;

  // 카테고리 값이 넘어 왔다면, 유효한 값인지 체크
  if (category) {
    const validCategory = [
      "한식",
      "일식",
      "중식",
      "양식",
      "구이/정식",
      "횟집",
      "치킨",
      "외국음식전문점",
      "분식",
      "뷔페식",
      "카페",
      "기타",
    ];

    if (!validCategory.includes(category)) {
      return res.send({
        isSuccess: false,
        code: 400, // 요청 실패시 400번대 코드
        message: "유효한 카테고리가 아닙니다.",
      });
    }
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn); //MySQL 접근
    try {
      const [rows] = await indexDao.selectNearFoodMap_Jongrogu(connection, category);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`readNearFoodMap_Jongrogu Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readNearFoodMap_Jongrogu DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}
 