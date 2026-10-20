// Nội dung lời chúc dành cho Mẹ
const wishMessage = "Chúc Mẹ luôn mạnh khỏe, hạnh phúc và luôn nở nụ cười tươi trên môi. Cảm ơn Mẹ vì đã luôn yêu thương và vất vả vì con!";

let isOpened = false;
let typeIndex = 0;

function toggleCard() {
  const card = document.querySelector('.card');
  card.classList.toggle('open');
  isOpened = card.classList.contains('open');

  if (isOpened && typeIndex === 0) {
    // Bắt đầu hiệu ứng gõ chữ khi mở thiệp lần đầu
    setTimeout(typeWriter, 500);
    playGreetingSound();
  }
}

// Hiệu ứng gõ chữ tự động
function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 50); // Tốc độ xuất hiện từng chữ (ms)
  }
}

// Giọng đọc lời chúc Tiếng Việt
function playGreetingSound() {
  try {
    const text = encodeURIComponent("Chúc mẹ luôn mạnh khỏe và hạnh phúc! Con yêu mẹ nhiều!");
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=vi&client=tw-ob`;
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
  } catch (e) {}
}
