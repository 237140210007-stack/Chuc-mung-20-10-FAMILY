// Lời chúc sinh nhật truyền cảm dành cho Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;
let isMusicStarted = false;

// Link YouTube nhúng bài "Ba Kể Con Nghe" Acoustic phát tự động từ đoạn Điệp khúc (start=78 giây)
const youtubeAudioUrl = "https://www.youtube.com/embed/tIjUEqm60Ig?autoplay=1&start=78&loop=1&playlist=tIjUEqm60Ig&enablejsapi=1";

function playYouTubeAudio() {
  if (!isMusicStarted) {
    const ytFrame = document.getElementById('ytAudio');
    if (ytFrame) {
      ytFrame.src = youtubeAudioUrl;
      isMusicStarted = true;
    }
  }
}

// Tự động kích hoạt phát nhạc ngay khi người dùng chạm/bấm bất kỳ đâu trên màn hình
document.addEventListener('touchstart', playYouTubeAudio, { once: true });
document.addEventListener('click', playYouTubeAudio, { once: true });

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  // Đảm bảo nhạc chắc chắn chạy khi bấm mở thiệp
  playYouTubeAudio();

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
