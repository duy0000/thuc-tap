document.addEventListener("DOMContentLoaded", function () {
  let messages = document.querySelectorAll(".message");
  let currentIndex = 0;
  setInterval(function () {
    messages[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % messages.length;
    messages[currentIndex].classList.add("active");
  }, 2000); // Thay đổi mỗi 3 giây
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".image-wrapper");
  const images = document.querySelectorAll(".image-wrapper img");
  const imageWidth = images[0].clientWidth; // Chiều rộng của mỗi ảnh
  const numImages = images.length;
  const screenWidth = window.innerWidth; // Chiều rộng của màn hình
  let currentIndex = 0;

  // Xử lý sự kiện click cho nút next
  document
    .querySelector(".fa-chevron-right")
    .addEventListener("click", function () {
      // Kiểm tra xem slider có đang ở ảnh cuối cùng và đã đạt đến 25% chiều rộng màn hình chưa
      if (
        currentIndex < numImages - 1 ||
        -wrapper.getBoundingClientRect().right <= screenWidth * 0.25
      ) {
        // Nếu chưa, di chuyển đến ảnh tiếp theo
        wrapper.style.transform = `translateX(-${
          imageWidth * (currentIndex + 1)
        }px)`;
        currentIndex++;
      }
    });

  // Xử lý sự kiện click cho nút previous
  document
    .querySelector(".fa-chevron-left")
    .addEventListener("click", function () {
      // Kiểm tra xem slider có đang ở ảnh đầu tiên không
      if (currentIndex > 0) {
        // Nếu không, di chuyển đến ảnh trước đó
        wrapper.style.transform = `translateX(-${
          imageWidth * (currentIndex - 1)
        }px)`;
        currentIndex--;
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("note").addEventListener("input", function () {
    var maxLength = 250;
    var currentLength = this.value.length;
    var remainingLength = maxLength - currentLength;
    console.log(remainingLength + " ký tự còn lại");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến modal
  var modal = document.getElementById("loginModal");
  // Mở modal sau 15 giây
  setTimeout(function () {
    modal.style.display = "block";
  }, 10000);

  // Lấy tham chiếu đến phần tử span đóng modal
  var closeBtn = document.querySelector("#loginModal .close");

  // Khi người dùng bấm vào nút đóng, đóng modal
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Khi người dùng bấm ngoài modal, đóng modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
