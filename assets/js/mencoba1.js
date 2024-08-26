function checkAnswers() {
  const correctAnswers = [
    "Kalimantan",
    "Sumatera",
    "Sulawesi",
    "Jawa",
    "Papua",
  ];

  let allAnswered = true;
  let allCorrect = true;

  // for (let i = 1; i <= 5; i++) {
  //   const userAnswer = document.getElementById(`answer${i}`).value.trim();
  //   const correctAnswer = correctAnswers[i - 1];

  //   const inputField = document.getElementById(`answer${i}`);

  //   if (!userAnswer) {
  //     allAnswered = false;
  //   }

  // if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
  //     allCorrect = false;
  //     inputField.style.backgroundColor = "#f44336"; // Merah untuk jawaban salah
  //   } else {
  //     inputField.style.backgroundColor = "#5afda3"; // Hijau untuk jawaban benar
  //     inputField.style.color = "#fff";
  //   }
  // }
  for (let i = 1; i <= 5; i++) {
    const userAnswer = document.getElementById(`answer${i}`).value.trim();
    const correctAnswer = correctAnswers[i - 1];

    const inputField = document.getElementById(`answer${i}`);

    if (!userAnswer) {
      allAnswered = false;
    }

    if (userAnswer !== correctAnswer) {
      allCorrect = false;
      inputField.style.backgroundColor = "#f44336"; // Merah untuk jawaban salah
    } else {
      inputField.style.backgroundColor = "#5afda3"; // Hijau untuk jawaban benar
      inputField.style.color = "#fff";
    }
  }

  if (!allAnswered) {
    Swal.fire({
      icon: "warning",
      title: "Perhatian!",
      text: "Isilah semua kolom terlebih dahulu.",
    });
  } else if (allCorrect) {
    Swal.fire({
      icon: "success",
      title: "Selamat!",
      text: "Semua jawaban benar.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Maaf !",
      text: "Masih ada jawaban yang tidak tepat,  periksa kembali.",
    });
  }
}

function resetAnswers() {
  for (let i = 1; i <= 5; i++) {
    const inputField = document.getElementById(`answer${i}`);
    inputField.value = "";
    inputField.style.backgroundColor = ""; // Menghapus warna latar belakang
  }
}
