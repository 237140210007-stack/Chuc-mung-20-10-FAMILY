// Nội dung lời chúc chung cho Phụ nữ gia đình
const wishMessage = "Kính chúc Mẹ, cô Nga, cô Nguyệt, cô Tiến và cô Hải luôn xinh đẹp, mạnh khỏe, hạnh phúc và luôn tràn ngập niềm vui. Cảm ơn những người phụ nữ tuyệt vời nhất của gia đình mình!";

let isOpened = false;
let typeIndex = 0;

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');
  const bgMusic = document.getElementById('bgMusic');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    // 1. Phát nhạc nền
    if (bgMusic) {
      bgMusic.volume = 0.4;
      bgMusic.play().catch(e => console.log("Lỗi phát nhạc:", e));
    }

    // 2. Chạy hiệu ứng chữ và đọc lời chúc
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
      playGreetingSound();
    }
  } else {
    // Đóng thiệp thì dừng nhạc
    if (bgMusic) {
      bgMusic.pause();
    }
  }
}

// Hiệu ứng chữ chạy từng tự
function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 40);
  }
}

// Giọng đọc lời chúc tiếng Việt
function playGreetingSound() {
  try {
    const text = encodeURIComponent("Kính chúc phụ nữ nhà mình luôn mạnh khỏe, xinh đẹp và hạnh phúc! Yêu cả nhà nhiều!");
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=vi&client=tw-ob`;
    const audio = new Audio(audioUrl);
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 600);
  } catch (e) {}
}
