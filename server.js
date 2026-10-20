const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ tất cả file tĩnh trong thư mục public (HTML, CSS, JS, hình ảnh, âm thanh)
app.use(express.static(path.join(__dirname, "public")));

// Mặc định khi mở trang web sẽ mở file thiep.html (hoặc index.html nếu có trong public)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thiep.html"));
});

// Lắng nghe cổng chạy ứng dụng trên Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server thiệp chúc mừng đang chạy tại cổng ${PORT}`);
});
