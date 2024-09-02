const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const users = [
  {
    user_id: "test",
    user_password: "1234",
    user_name: "테스트유저",
    user_info: "테스트 유저입니다",
  },
];

const app = express();
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["OPTIONS", "GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
    signed: false,
    name: "session_id",
  })
);

app.post("/", (req, res) => {
  const { userId, userPassword } = req.body;
  console.log("post", userId, userPassword);
  const userInfo = users.find(
    (el) => el.user_id === userId && userPassword === el.user_password
  );
  console.log("post userInfo", userInfo);
  if (!userInfo) {
    res.status(401).send("로그인 실패");
  } else {
    req.session.userId = userInfo.user_id;
    res.send("세션 생성 완료!");
  }
});

app.get("/", (req, res) => {
  const userInfo = users.find((el) => {
    return el.user_id === req.session.userId;
  });

  console.log("get", userInfo);
  return res.json(userInfo);
});

app.delete("/", (req, res) => {
  req.session.destroy()
  res.clearCookie("session_id")
  return res.send("세션 삭제 완료!")
});

app.listen(3000, () => console.log("서버 실행"));
