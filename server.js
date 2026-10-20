const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ các file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Mặc định trả về file thiệp chúc mừng thiep.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thiep.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server thiệp chúc mừng đang chạy tại cổng ${PORT}`);
});
