const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");

dotenv.config();
const app = express();
app.set("port", 3500);
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));


// 라우터
app.use("/", indexRouter);

app.use((req, res, next) => { // 404 미들웨어
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => { // 에러 처리 미들웨어
  console.log(error);
  res.status(error.stage || 500);
  res.send('error');
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 - 서버 실행 중");
});