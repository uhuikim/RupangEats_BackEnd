const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG

// DB접속
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

let db = [];

//index.js를 제외하고 나머지 파일들을 참조해서 테이블을 생성해주는 코드
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

//모델관의 관계
Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
