let sidebar = document.querySelector(".sidebarr");
let sidebarBTN = document.querySelector(".fa-bars");

sidebarBTN.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

$(document).ready(function () {
  // dropdown Sidebar
  $(".iconn-link").click(function () {
    if ($(this).siblings(".sub-menuu").css("display") == "block") {
      $(this).siblings(".sub-menuu").css("display", "none");
    } else {
      $(".sub-menuu").css("display", "none");
      $(this).siblings(".sub-menuu").css("display", "block");
    }
  });
});

// Drag In Drop
function allowDrop(even) {
  even.preventDefault();
}

function drag(even) {
  even.dataTransfer.setData("text", even.target.id);
}

function drop(even) {
  even.preventDefault();
  var fetchData = even.dataTransfer.getData("text");
  even.target.appendChild(document.getElementById(fetchData));
}

const images = document.querySelectorAll(".imagess img");
const gambar_modal = document.querySelector(".gambar_modal");
const modalImg = document.querySelector(".modalImg");
const modalTxt = document.querySelector(".modalTxt");
const close = document.querySelector(".tutup");

images.forEach((image) => {
  image.addEventListener("click", () => {
    modalImg.src = image.src;
    modalTxt.innerHTML = image.alt;
    gambar_modal.classList.add("appear");

    close.addEventListener("click", () => {
      gambar_modal.classList.remove("appear");
    });
  });
});

// Loading page
window.addEventListener("load", function () {
  var loader = document.querySelector(".loader");
  var content = document.querySelector("body");

  // Hilangkan blur dan sembunyikan loader setelah halaman selesai dimuat
  loader.style.opacity = "0";
  content.classList.remove("blur");

  // Set timeout untuk menghapus loader setelah transisi selesai
  setTimeout(function () {
    loader.style.display = "none";
  }, 300);
});
