// Lời chúc sinh nhật truyền cảm dành cho Bố
const wishMessage = "Chúng con không giỏi nói lời ngọt ngào, nhưng chúng con thương bố rất nhiều 🥹. Chúc bố sinh nhật thật hạnh phúc, nhiều niềm vui và bình an. Gia đình mong bố luôn mạnh khỏe, xây một ngôi nhà thật đẹp!! Cảm ơn bố vì đã luôn âm thầm hy sinh cho gia đình. Hehe quà của chúng con gửi tặng bố sau nha ạ. Happy Birthday Bố!";

let isOpened = false;
let typeIndex = 0;

function toggleCard() {
  const card = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container');
  const bgMusic = document.getElementById('bgMusic');

  card.classList.toggle('open');
  if (cardContainer) {
    cardContainer.classList.toggle('open-active');
  }
  
  isOpened = card.classList.contains('open');

  if (isOpened) {
    if (bgMusic) {
      bgMusic.volume = 0.8;

      // Đảm bảo nhạc đệm đã sẵn sàng rồi mới nhảy tới giây 78 (đoạn điệp khúc)
      const playChorus = () => {
        bgMusic.currentTime = 78; // Giây thứ 78: "Khi nghe nhạc con nhẹ nhàng hơn..."
        bgMusic.play().catch(err => console.log("Lỗi phát nhạc:", err));
      };

      // Nếu nhạc đã nạp dữ liệu xong -> Phát ngay
      if (bgMusic.readyState >= 1) {
        playChorus();
      } else {
        // Nếu chưa nạp xong -> Đợi nạp xong metadata rồi nhảy tới giây 78
        bgMusic.addEventListener('loadedmetadata', playChorus, { once: true });
        bgMusic.load(); // Kích hoạt nạp dữ liệu
      }
    }

    // Hiệu ứng gõ chữ
    if (typeIndex === 0) {
      setTimeout(typeWriter, 500);
    }
  } else {
    // Đóng thiệp thì dừng nhạc
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
