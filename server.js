const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Phục vụ các file tĩnh trong thư mục public (HTML, CSS, JS, hình ảnh, âm thanh)
app.use(express.static(path.join(__dirname, "public")));

// Route xem thiệp chúc mừng (Truy cập bằng đường dẫn /thiep)
app.get("/thiep", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thiep.html"));
});

// Chuyển hướng tất cả các route còn lại về trang chủ game học tập (index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Dữ liệu mẫu cho các trò chơi
const ALPHABET = ["A", "B", "C", "D", "Đ", "E", "Ê", "G", "H", "I", "K", "L", "M", "N", "O", "Ô", "Ơ", "P", "Q", "R", "S", "T", "U", "Ư", "V", "X", "Y"];
const ANIMALS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐸", "🐥", "🐮", "🐷"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Logic tạo câu hỏi các trò chơi
function generateLetterQuestion() {
  const target = getRandomItem(ALPHABET);
  const options = new Set([target]);
  while (options.size < 4) {
    options.add(getRandomItem(ALPHABET));
  }
  return {
    type: "letter",
    target,
    options: Array.from(options).sort(() => Math.random() - 0.5)
  };
}

function generateCountQuestion() {
  const count = getRandomInt(1, 10);
  const icon = getRandomItem(ANIMALS);
  const options = new Set([count]);
  while (options.size < 4) {
    options.add(getRandomInt(1, 10));
  }
  return {
    type: "count",
    target: count,
    icon,
    options: Array.from(options).sort((a, b) => a - b)
  };
}

function generateSequenceQuestion() {
  const isAscending = Math.random() > 0.3;
  const length = 5;
  let sequence = [];
  if (isAscending) {
    const start = getRandomInt(1, 6);
    for (let i = 0; i < length; i++) sequence.push(start + i);
  } else {
    const start = getRandomInt(5, 10);
    for (let i = 0; i < length; i++) sequence.push(start - i);
  }
  const missingIdx = getRandomInt(1, 3);
  const target = sequence[missingIdx];
  sequence[missingIdx] = "?";
  const options = new Set([target]);
  while (options.size < 4) {
    options.add(getRandomInt(1, 10));
  }
  return {
    type: "sequence",
    sequence,
    target,
    options: Array.from(options).sort((a, b) => a - b)
  };
}

function generateCompareQuestion() {
  const iconA = getRandomItem(ANIMALS);
  let iconB = getRandomItem(ANIMALS);
  while (iconA === iconB) iconB = getRandomItem(ANIMALS);
  let countA = getRandomInt(1, 8);
  let countB = getRandomInt(1, 8);
  while (countA === countB) countB = getRandomInt(1, 8);
  const isMore = Math.random() > 0.5;
  const target = isMore ? (countA > countB ? "A" : "B") : (countA < countB ? "A" : "B");
  return { type: "compare", iconA, countA, iconB, countB, isMore, target };
}

function generateFindLetterQuestion() {
  const targetChar = getRandomItem(["E", "A", "O", "U", "I", "B", "C"]);
  const gridSize = 16;
  const grid = [];
  let targetCount = 0;
  for (let i = 0; i < gridSize; i++) {
    if (Math.random() < 0.35) {
      grid.push(targetChar);
      targetCount++;
    } else {
      grid.push(getRandomItem(ALPHABET.filter(c => c !== targetChar)));
    }
  }
  if (targetCount === 0) {
    grid[0] = targetChar;
    targetCount = 1;
  }
  const options = new Set([targetCount]);
  while (options.size < 4) {
    options.add(getRandomInt(1, 8));
  }
  return { type: "find_letter", targetChar, grid, target: targetCount, options: Array.from(options).sort((a, b) => a - b) };
}

function generateMazeQuestion() {
  const gridData = [
    ["🐭", "🔴1", "🐜", "🔴2"],
    ["🐜", "🔴2", "🔴3", "🐛"],
    ["🔴3", "🐱", "🔴4", "🔴5"],
    ["🐛", "🔴4", "🔴5", "🧀"]
  ];
  const targetPath = ["🔴1", "🔴2", "🔴3", "🔴4", "🔴5"];
  return {
    type: "maze",
    gridData,
    targetPath,
    promptText: "🐭 Chuột con hãy vượt qua chướng ngại vật (Mèo 🐱, Kiến 🐜) để lấy Pho mát 🧀 nhé!"
  };
}

function generateMemoryQuestion() {
  const isNumber = Math.random() > 0.5;
  const pool = isNumber 
    ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    : ["A", "B", "C", "D", "E", "G", "H", "M", "O"];
  const selected = [];
  while (selected.length < 3) {
    const item = getRandomItem(pool);
    if (!selected.includes(item)) selected.push(item);
  }
  const cards = [...selected, ...selected].sort(() => Math.random() - 0.5);
  return {
    type: "memory",
    cards,
    totalPairs: 3,
    promptText: isNumber ? "Bé hãy lật các ô để tìm 3 cặp số giống nhau nhé!" : "Bé hãy lật các ô để tìm 3 cặp chữ cái giống nhau nhé!"
  };
}

// Khởi tạo Socket.IO kết nối thời gian thực
io.on("connection", (socket) => {
  socket.on("get:question", (gameType, cb) => {
    let q;
    if (gameType === "letter") q = generateLetterQuestion();
    else if (gameType === "count") q = generateCountQuestion();
    else if (gameType === "sequence") q = generateSequenceQuestion();
    else if (gameType === "compare") q = generateCompareQuestion();
    else if (gameType === "find_letter") q = generateFindLetterQuestion();
    else if (gameType === "maze") q = generateMazeQuestion();
    else if (gameType === "memory") q = generateMemoryQuestion();
    cb({ ok: true, question: q });
  });

  socket.on("check:answer", ({ gameType, target, answer }, cb) => {
    let isCorrect = false;
    if (gameType === "maze") {
      isCorrect = JSON.stringify(target) === JSON.stringify(answer);
    } else {
      isCorrect = String(target) === String(answer);
    }
    cb({ correct: isCorrect });
  });
});

// Lắng nghe cổng khởi chạy server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy thành công tại cổng ${PORT}`);
});
