function countdown(hour, menit) {
  const jam = hour; //jam
  let waktu = "";

  if (jam > 0) {
    waktu = jam * 3600 + menit * 60; //jam

    if (sessionStorage.getItem("waktu") == null) {
      sessionStorage.setItem("waktu", waktu);
    } else {
      waktu = sessionStorage.getItem("waktu");
    }

    let timer = setInterval(function () {
      if (waktu == 0) {
        //pencekkan sisa waktu perdetik
        clearInterval(timer);
        sessionStorage.removeItem("waktu");
        Swal.fire({
          title: "Mohon Maaf",
          text: "Waktu pengerjaan Kamu telah berakhir",
          icon: "error",
        }).then(() => {
          document.location.href = "javascript: history.go(-1)"; //kembali ke halaman sebelumnya
        });
      } else {
        waktu -= 1; //pengurangan 1 detik
      }

      const hour = Math.floor(waktu / 3600);
      const min = Math.floor((waktu % 3600) / 60);
      const sec = waktu % 60;

      let sekon = sec < 10 ? "0" + sec : sec;
      let menit = min < 10 ? "0" + min : min;
      let jam2 = hour < 10 ? "0" + hour : hour;

      $(".timer-soal").text(jam2 + ":" + menit + ":" + sekon);

      if (min == 5 && sec == 55) {
        Swal.fire({
          title: "Perhatikan!",
          text: "Waktu tersisa 5 menit",
          buttons: false,
          timer: 1500,
          icon: "warning",
        });
      }
    }, 1000);
  } else {
    waktu = menit * 60; //sekon

    if (sessionStorage.getItem("waktu") == null) {
      sessionStorage.setItem("waktu", waktu);
    } else {
      waktu = sessionStorage.getItem("waktu");
    }

    let timer = setInterval(function () {
      if (waktu == 0) {
        //pencekkan sisa waktu perdetik
        clearInterval(timer);
        sessionStorage.removeItem("waktu");
        Swal.fire({
          title: "Mohon Maaf",
          text: "Waktu pengerjaan Kamu telah berakhir",
          icon: "error",
        }).then(() => {
          document.location.href = "javascript: history.go(-1)"; //kembali ke halaman sebelumnya
        });
      } else {
        waktu -= 1; //pengurangan 1 detik
      }

      const min = Math.floor(waktu / 60);
      const sec = waktu % 60;

      let sekon = sec < 10 ? "0" + sec : sec;
      let menit = min < 10 ? "0" + min : min;

      $(".timer-soal").text(menit + ":" + sekon);

      if (min == 5 && sec == 0) {
        Swal.fire({
          title: "Perhatikan!",
          text: "Waktu tersisa 5 menit",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
        });
      }
    }, 1000);
  }
}

// export { countdown }
