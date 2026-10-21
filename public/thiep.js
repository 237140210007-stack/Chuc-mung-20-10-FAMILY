// Lời chúc sinh nhật truyền cảm dành cho Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;

const bgMusic = document.getElementById('bgMusic');

// Kích hoạt nạp sẵn âm thanh khi có thao tác chạm màn hình
function forcePlayAudio() {
  if (bgMusic) {
    bgMusic.volume = 0.7;
    bgMusic.play().catch(err => console.log("Chờ bấm mở thiệp:", err));
  }
}

document.addEventListener('touchstart', forcePlayAudio, { once: true });
document.addEventListener('click', forcePlayAudio, { once: true });

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');

  card.classList.toggle('open');
  cardContainer.classList.toggle('open-active');
  isOpened = card.classList.contains('open');

  if (isOpened) {
    // Phát nhạc mượt mà ngay khi bấm mở thiệp
    if (bgMusic) {
      bgMusic.volume = 0.7;
      bgMusic.play().catch(e => console.log("Lỗi phát nhạc:", e));
    }

    // Chạy hiệu ứng gõ chữ
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
    }
  } else {
    if (bgMusic) {
      bgMusic.pause();
    }
  }
}

function typeWriter() {
  if (typeIndex < wishMessage.length) {
    document.getElementById("typedText").innerHTML += wishMessage.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 35);
  }
}
