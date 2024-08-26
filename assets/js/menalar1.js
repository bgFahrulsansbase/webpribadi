const tables = document.querySelectorAll(".menalar2");
tables.forEach((table) => {
  const tableNumber = table.id.split("-")[1];
  const cekJawabanButton = table.querySelector(
    `[data-table="${tableNumber}"].btn-cekjwb`
  );
  const ulangiJawabanButton = table.querySelector(
    `[data-table="${tableNumber}"].btn-undo`
  );
  const rows = table.querySelectorAll("tr:not(:first-child");

  rows.forEach((row) => {
    const checkboxes = row.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        checkboxes.forEach((cb) => {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
      });
    });

    cekJawabanButton.addEventListener("click", () => {
      let allAnswered = true;
      let allCorrect = true;

      rows.forEach((row) => {
        const checkboxes = row.querySelectorAll(".checkbox");
        const keteranganCell = row.querySelector(".keterangan");

        let isCorrect = false;
        let isAnswered = false;

        checkboxes.forEach((checkbox) => {
          const jawaban = checkbox.getAttribute("data-jawaban");
          if (checkbox.checked) {
            isAnswered = true;
            if (jawaban === "benar") {
              isCorrect = true;
            }
          }
        });

        if (!isAnswered) {
          allAnswered = false;
          keteranganCell.textContent = "Belum dijawab";
          keteranganCell.classList.remove("benar", "salah");
        } else if (isCorrect) {
          keteranganCell.textContent = "Benar";
          keteranganCell.classList.add("benar");
          keteranganCell.classList.remove("salah");
        } else {
          allCorrect = false;
          keteranganCell.textContent = "Salah";
          keteranganCell.classList.add("salah");
          keteranganCell.classList.remove("benar");
        }
      });

      if (!allAnswered) {
        Swal.fire({
          icon: "warning",
          title: "Perhatian!",
          text: "Lengkapi semua jawaban terlebih dahulu.",
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
          title: "Maaf!",
          text: "Masih ada jawaban yang salah. Silahkan coba lagi.",
        });
      }
    });

    ulangiJawabanButton.addEventListener("click", () => {
      rows.forEach((row) => {
        const checkboxes = row.querySelectorAll(".checkbox");
        const keteranganCell = row.querySelector(".keterangan");

        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });

        keteranganCell.textContent = "";
        keteranganCell.classList.remove("benar", "salah");
      });
    });

    ulangiJawabanButton.addEventListener("click", () => {
      rows.forEach((row) => {
        const checkboxes = row.querySelectorAll(".checkbox");
        const keteranganCell = row.querySelector(".keterangan");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        keteranganCell.textContent = "";
        keteranganCell.classList.remove("benar", "salah");
      });
    });
  });
});
