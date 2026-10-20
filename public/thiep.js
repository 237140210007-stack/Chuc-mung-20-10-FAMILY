// Lời chúc dành cho Mẹ
const wishMessage = "Chúc Mẹ luôn mạnh khỏe, hạnh phúc và luôn nở nụ cười tươi trên môi. Cảm ơn Mẹ vì đã luôn yêu thương và vất vả vì con!";

let isOpened = false;
let typeIndex = 0;

function toggleCard() {
  const card = document.querySelector('.card');
  card.classList.toggle('open');
  isOpened = card.classList.contains('open');

  if (isOpened && typeIndex === 0) {
    // Chờ thiệp lật xong mới bắt đầu hiệu ứng chữ chạy và phát giọng đọc
    setTimeout(typeWriter, 400);
    playGreetingSound();
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

// Giọng đọc lời chúc tiếng Việt chuẩn
function playGreetingSound() {
  try {
    const text = encodeURIComponent("Chúc mẹ luôn mạnh khỏe và hạnh phúc! Con yêu mẹ nhiều!");
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=vi&client=tw-ob`;
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
  } catch (e) {}
}
