// Lời chúc gửi đến phụ nữ nhà mình
const wishMessage = "Kính chúc Mẹ, cô Nga, cô Nguyệt, cô Tiến và cô Hải luôn xinh đẹp, mạnh khỏe, hạnh phúc và luôn tràn ngập niềm vui. Cảm ơn những người phụ nữ tuyệt vời nhất của gia đình!";

let isOpened = false;
let typeIndex = 0;
let isPlaying = false;

// Tự động tải trước nhạc để sẵn sàng phát trên điện thoại
window.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.load();
  }
});

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');
  
  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    // Kích hoạt phát nhạc khi mở thiệp
    startMusic();

    // Hiệu ứng chữ chạy tự động
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
    }
  } else {
    // Đóng thiệp thì dừng nhạc
    stopMusic();
  }
}

function startMusic() {
  const bgMusic = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  if (bgMusic) {
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        if (musicIcon) musicIcon.classList.add('playing');
      }).catch(error => {
        console.log("Trình duyệt điện thoại chờ tương tác nút nhạc:", error);
      });
    }
  }
}

function stopMusic() {
  const bgMusic = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  if (bgMusic) {
    bgMusic.pause();
    isPlaying = false;
    if (musicIcon) musicIcon.classList.remove('playing');
  }
}

// Bật / Tắt nhạc chủ động khi bấm vào nút 🎵 góc trên
function toggleMusic(event) {
  event.stopPropagation(); // Tránh kích hoạt lật thiệp
  if (isPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
}

// Hiệu ứng gõ chữ từng ký tự
function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 40);
  }
}
