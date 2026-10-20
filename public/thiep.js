// Lời chúc dành cho Mẹ
const wishMessage = "Chúc Mẹ luôn mạnh khỏe, hạnh phúc và luôn nở nụ cười tươi trên môi. Cảm ơn Mẹ vì đã luôn yêu thương và vất vả vì con!";

let isOpened = false;
let typeIndex = 0;

function toggleCard() {
  const card = document.querySelector('.card');
  const bgMusic = document.getElementById('bgMusic');

  card.classList.toggle('open');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    // 1. Bật nhạc nền nhẹ nhàng (trình duyệt cho phép phát vì do người dùng click)
    if (bgMusic) {
      bgMusic.volume = 0.4; // Âm lượng vừa phải (40%)
      bgMusic.play().catch(e => console.log("Lỗi phát nhạc:", e));
    }

    // 2. Chạy hiệu ứng gõ chữ và phát lời thoại
    if (typeIndex === 0) {
      setTimeout(typeWriter, 400);
      playGreetingSound();
    }
  } else {
    // Nếu đóng thiệp lại thì tạm dừng nhạc
    if (bgMusic) {
      bgMusic.pause();
    }
  }
}

// Hiệu ứng chữ chạy tự động
function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 45);
  }
}

// Giọng đọc lời chúc tiếng Việt
function playGreetingSound() {
  try {
    const text = encodeURIComponent("Chúc mẹ luôn mạnh khỏe và hạnh phúc! Con yêu mẹ nhiều!");
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=vi&client=tw-ob`;
    const audio = new Audio(audioUrl);
    // Phát lời đọc sau khi mở thiệp 0.5s
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 500);
  } catch (e) {}
}
