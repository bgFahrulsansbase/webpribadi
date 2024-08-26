// Tabel 2
const rows = document.querySelectorAll("tr:not(:first-child)");
const cekJawabanButton = document.getElementById("cekJawaban1");
const ulangiJawabanButton = document.getElementById("ulangiJawaban1");

rows.forEach((row) => {
  const checkboxes = row.querySelectorAll(".checkbox1");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    });
  });
});

cekJawabanButton.addEventListener("click", () => {
  rows.forEach((row) => {
    const checkboxes = row.querySelectorAll(".checkbox1");
    const keteranganCell = row.querySelector(".keterangan");

    let isCorrect = false;
    checkboxes.forEach((checkbox) => {
      const jawaban = checkbox.getAttribute("data-jawaban");
      if (checkbox.checked && jawaban === "benar") {
        isCorrect = true;
      }
    });

    if (isCorrect) {
      keteranganCell.textContent = "Benar";
      keteranganCell.classList.add("benar");
      keteranganCell.classList.remove("salah");
    } else {
      keteranganCell.textContent = "Salah";
      keteranganCell.classList.add("salah");
      keteranganCell.classList.remove("benar");
    }
  });
});

ulangiJawabanButton.addEventListener("click", () => {
  rows.forEach((row) => {
    const checkboxes = row.querySelectorAll(".checkbox1");
    const keteranganCell = row.querySelector(".keterangan");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    keteranganCell.textContent = "";
    keteranganCell.classList.remove("benar", "salah");
  });
});
