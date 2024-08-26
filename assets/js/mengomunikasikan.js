function simpanJawaban() {
  const jawaban = document.getElementById(
    "exampleFormControlkkesimpulan"
  ).value;

  if (jawaban.trim() === "") {
    Swal.fire({
      icon: "warning",
      title: "Peringatan!",
      text: "Isilah jawaban terlebih dahulu!",
    });
    return;
  }

  set(ref(db, `UserSiswa/${nisn}/mengomunikasikan/mengomunikasikan-1`), {
    jawaban: jawaban,
    tanggal: getCurrentDate(),
    waktu: getCurrentTime(),
  })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jawaban berhasil disimpan di Firebase.",
      }).then(() => {
        // Logika atau redirect tambahan di sini
      });
    })
    .catch((error) => {
      console.error("Error saving answer to Firebase: ", error);
    });
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
