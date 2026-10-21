// Lời chúc sinh nhật tình cảm gửi Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;

const bgMusic = document.getElementById('bgMusic');

// Tự động kích hoạt phát nhạc ngay khi bấm/chạm đầu tiên vào màn hình
function playAudioDirectly() {
  if (bgMusic) {
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});
  }
}

// Lắng nghe thao tác chạm đầu tiên trên điện thoại để mở âm thanh ngầm
document.addEventListener('touchstart', playAudioDirectly, { once: true });
document.addEventListener('click', playAudioDirectly, { once: true });

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  // Đảm bảo nhạc phát mượt khi bấm mở thiệp
  playAudioDirectly();

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
