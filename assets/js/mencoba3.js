// Simpan posisi awal elemen-elemen teks saat halaman dimuat
var initialPositions = {};

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target;

  if (target.classList.contains("dropzone3")) {
    target.appendChild(document.getElementById(data));
  }
}

function checkAnswers() {
  var dropzones = document.querySelectorAll(".dropzone3");
  var textItems = document.querySelectorAll(".text-item");

  for (var i = 0; i < dropzones.length; i++) {
    dropzones[i].classList.remove("correct");
    dropzones[i].classList.remove("incorrect");
  }

  for (var i = 0; i < textItems.length; i++) {
    var parent = textItems[i].parentNode;
    if (parent.id === textItems[i].getAttribute("data-target")) {
      textItems[i].classList.add("correct");
    } else {
      textItems[i].classList.add("incorrect");
    }
  }
}

function resetDragAndDrop() {
  var dropzones = document.querySelectorAll(".dropzone3");
  var textItems = document.querySelectorAll(".text-item");

  // Kembalikan elemen ke posisi awal dan tambahkan attribute draggable
  for (var i = 0; i < textItems.length; i++) {
    var textItem = textItems[i];
    var initialPos = initialPositions[textItem.id];

    textItem.style.position = "static";
    textItem.style.top = "auto";
    textItem.style.left = "auto";
    textItem.classList.remove("correct", "incorrect");

    // Tambahkan attribute draggable dan event handler drag
    textItem.setAttribute("draggable", "true");
    textItem.addEventListener("dragstart", drag);

    // Tambahkan elemen kembali ke .bg-text-item
    document.querySelector(".bg-text-item").appendChild(textItem);
  }

  // Kosongkan dropzone
  for (var i = 0; i < dropzones.length; i++) {
    dropzones[i].innerHTML = "";
    dropzones[i].classList.remove("correct", "incorrect");
  }
}

function checkAnswers() {
  var dropzones = document.querySelectorAll(".dropzone3");
  var textItems = document.querySelectorAll(".text-item");
  var correctCount = 0;
  var answeredCount = 0;

  for (var i = 0; i < dropzones.length; i++) {
    dropzones[i].classList.remove("correct");
    dropzones[i].classList.remove("incorrect");
  }

  for (var i = 0; i < textItems.length; i++) {
    var parent = textItems[i].parentNode;
    if (parent.id === textItems[i].getAttribute("data-target")) {
      textItems[i].classList.add("correct");
      correctCount++;
    } else {
      textItems[i].classList.add("incorrect");
    }

    // Hitung jumlah jawaban yang sudah diisi
    if (parent.id) {
      answeredCount++;
    }
  }

  // Tampilkan SweetAlert2
  if (correctCount === textItems.length) {
    // Semua jawaban benar
    Swal.fire({
      icon: "success",
      title: "Selamat!",
      text: "Semua jawaban benar!",
    });
  } else if (answeredCount !== textItems.length) {
    // Ada jawaban yang kosong
    Swal.fire({
      icon: "warning",
      title: "Perhatian!",
      text: "Selesaikan semua tugas terlebih dahulu. Ulangi jawaban",
    });
  } else {
    // Ada jawaban yang salah, minta untuk mengulangi
    Swal.fire({
      icon: "error",
      title: "Maaf!",
      text: "Ada jawaban yang salah. Silahkan coba lagi.",
    });
  }
}
