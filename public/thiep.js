// Lời chúc sinh nhật tình cảm gửi Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;
let isPlaying = false;
let ytPlayer;

// Tích hợp YouTube Iframe API cài đặt phát đúng đoạn điệp khúc "Ba Kể Con Nghe" (giây 78)
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: 'tIjUEqm60Ig', // Video Ba Kể Con Nghe
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'start': 78,   // Bắt đầu từ đoạn Điệp khúc (giây 78)
      'loop': 1,
      'playlist': 'tIjUEqm60Ig'
    }
  });
}

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    playMusic();
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
    }
  } else {
    pauseMusic();
  }
}

function playMusic() {
  const musicIcon = document.getElementById('musicIcon');
  const bgMusic = document.getElementById('bgMusic');

  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    ytPlayer.playVideo();
    isPlaying = true;
    if (musicIcon) musicIcon.classList.add('playing');
  } else if (bgMusic) {
    bgMusic.volume = 0.6;
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicIcon) musicIcon.classList.add('playing');
    }).catch(() => {});
  }
}

function pauseMusic() {
  const musicIcon = document.getElementById('musicIcon');
  const bgMusic = document.getElementById('bgMusic');

  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    ytPlayer.pauseVideo();
  }
  if (bgMusic) {
    bgMusic.pause();
  }
  isPlaying = false;
  if (musicIcon) musicIcon.classList.remove('playing');
}

function toggleMusic(e) {
  if (e) e.stopPropagation();
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 35);
  }
}
