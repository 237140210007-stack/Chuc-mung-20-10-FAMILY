// Lời chúc sinh nhật tình cảm gửi Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;
let ytPlayer;

// Tự động phát nhạc ngay khi vừa nạp xong trang web
window.addEventListener('load', () => {
  autoPlayAudio();
});

// Tự động kích hoạt âm thanh ngay khi có tương tác đầu tiên trên trang (chạm/click)
function unlockAndPlay() {
  autoPlayAudio();
  document.removeEventListener('touchstart', unlockAndPlay);
  document.removeEventListener('click', unlockAndPlay);
}
document.addEventListener('touchstart', unlockAndPlay, { once: true });
document.addEventListener('click', unlockAndPlay, { once: true });

// Khởi tạo YouTube Iframe API & phát tự động ngay khi sẵn sàng
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: 'tIjUEqm60Ig', // Video Ba Kể Con Nghe
    playerVars: {
      'autoplay': 1, // Kích hoạt tự động phát ngay
      'controls': 0,
      'start': 78,    // Bắt đầu từ đoạn Điệp khúc (giây 78)
      'loop': 1,
      'playlist': 'tIjUEqm60Ig'
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function autoPlayAudio() {
  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    ytPlayer.playVideo();
  }
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});
  }
}

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  // Đảm bảo nhạc vẫn tiếp tục chạy mượt mà khi bấm mở thiệp
  autoPlayAudio();

  if (isOpened && typeIndex === 0) {
    setTimeout(typeWriter, 500);
  }
}

function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 35);
  }
}
