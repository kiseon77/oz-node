const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("test-cookie", "my cookie", {
    maxAge: 100000,
    httpOnly: true,
    secure: true,
  });
  res.send("쿠키 생성 완료");
});
app.delete("/", (req, res) => {
  res.clearCookie("test-cookie",{
    httpOnly: true,
    secure: true,
  });
  res.send("쿠키 삭제 완료");
});

app.listen(3000, () => console.log("서버실행"));
