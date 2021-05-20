const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// db 관련
const db = require("./models");

class App {
  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        // return db.sequelize.sync();
      })
      .then(() => {
        console.log("DB Sync complete.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  setStatic() {
    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/static", express.static("static"));
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404).render("common/404.html");
    });
  }

  errorHandler() {
    // this.app.use( (err, req, res,  _ ) => {
    //     res.status(500).render('common/500.html')
    // });
  }
}

module.exports = new App().app;
