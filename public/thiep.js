// Lời chúc gửi đến phụ nữ nhà mình
const wishMessage = "Kính chúc Mẹ, cô Nga, cô Nguyệt, cô Tiến và cô Hải luôn xinh đẹp, mạnh khỏe, hạnh phúc và luôn tràn ngập niềm vui. Cảm ơn những người phụ nữ tuyệt vời nhất của gia đình mình!";

let isOpened = false;
let typeIndex = 0;
let player;

// Tự động gắn nhạc từ ID YouTube WWpCi2xYUOc khi API sẵn sàng
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: 'WWpCi2xYUOc',
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'WWpCi2xYUOc'
    }
  });
}

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');
  const bgMusic = document.getElementById('bgMusic');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    // 1. Kích hoạt phát nhạc YouTube chuẩn xác
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
    } else if (bgMusic) {
      bgMusic.volume = 0.4;
      bgMusic.play().catch(e => console.log("Lỗi phát nhạc dự phòng:", e));
    }

    // 2. Chạy hiệu ứng gõ chữ & giọng đọc
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
      playGreetingSound();
    }
  } else {
    // Tạm dừng nhạc khi đóng thiệp
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    }
    if (bgMusic) {
      bgMusic.pause();
    }
  }
}

// Hiệu ứng chữ gõ tự động
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
