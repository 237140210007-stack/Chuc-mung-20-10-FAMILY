const wishMessage = "Kính chúc Mẹ, cô Nga, cô Nguyệt, cô Tiến và cô Hải luôn xinh đẹp, mạnh khỏe, hạnh phúc và luôn tràn ngập niềm vui. Cảm ơn những người phụ nữ tuyệt vời nhất của gia đình mình!";

let isOpened = false;
let typeIndex = 0;
let isPlaying = false;

const bgMusic = document.getElementById('bgMusic');

// Kích hoạt unlock Audio trên iOS Safari / Zalo Browser ngay khi có bất kỳ tương tác chạm vào màn hình
function unlockAudio() {
  if (bgMusic) {
    bgMusic.play().then(() => {
      bgMusic.pause();
    }).catch(() => {});
  }
  document.removeEventListener('touchstart', unlockAudio);
  document.removeEventListener('click', unlockAudio);
}
document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('click', unlockAudio, { once: true });

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
  if (bgMusic) {
    bgMusic.volume = 0.6;
    const promise = bgMusic.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlaying = true;
        if (musicIcon) musicIcon.classList.add('playing');
      }).catch(err => {
        console.log("Cần bấm nút nhạc để phát:", err);
      });
    }
  }
}

function pauseMusic() {
  const musicIcon = document.getElementById('musicIcon');
  if (bgMusic) {
    bgMusic.pause();
    isPlaying = false;
    if (musicIcon) musicIcon.classList.remove('playing');
  }
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
    setTimeout(typeWriter, 40);
  }
}
