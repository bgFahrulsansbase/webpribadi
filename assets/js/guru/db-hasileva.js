// Konfigurasi FIRE BASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  onValue,
  get,
  update,
  remove,
  query,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpuaiGW2az7vtpBxIBioMwS-UtqyanUeQ",
  authDomain: "indonesiakukayaraya-20be9.firebaseapp.com",
  databaseURL: "https://indonesiakukayaraya-20be9-default-rtdb.firebaseio.com",
  projectId: "indonesiakukayaraya-20be9",
  storageBucket: "indonesiakukayaraya-20be9.appspot.com",
  messagingSenderId: "15860856240",
  appId: "1:15860856240:web:c9eacf9097e5db1bf09275",
  measurementId: "G-59PE0K6M2M",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbref = ref(db, "UserSiswa/");

const getKelas = new Promise((resolve, reject) => {
  const antri = query(ref(db, "listKelas/"));
  onValue(antri, (snapshot) => {
    const kelasList = snapshot.val();
    console.log(kelasList);
    resolve(kelasList);
  });
});
getKelas.then(
  (kelas) => {
    for (var key in kelas) {
      if (kelas.hasOwnProperty(key)) {
        //untuk memeriksa apakah objek memiliki properti dengan nama tertentu
        var option = $("<option>").val(key).text(kelas[key].kelas);
        $("#kelas").append(option);
      }
    }
  },
  function (error) {
    console.log("Error:", error);
  }
);

const getDataSiswa = new Promise((resolve, reject) => {
  const antri = query(ref(db, "UserSiswa/"));
  onValue(antri, (snapshot) => {
    const users = snapshot.val();
    resolve(users);
  });
});
getDataSiswa.then((users) => {
  $("#example").DataTable().clear().destroy(); //menghapus data tabel terdahulu
  const tampilData = document.querySelector("#dataEvaluasi");
  for (let user in users) {
    if (users[user].evaluasi) {
      const tr = `
          <tr data-id=${user}>
            <td class="text-center">${users[user].nisn}</td>
            <td class="text-capitalize text-center">${users[user].nama}</td>
            <td class="text-center">${users[user].kelas}</td>
            <td class="text-center">${users[user].evaluasi.skor}</td>
            <td class="text-center">${users[user].evaluasi.waktu}</td>
            <td class="text-center">${users[user].evaluasi.tanggal}</td>
          </tr>
        `;

      tampilData.innerHTML += tr;
    }
  }

  $("#example").DataTable({
    dom:
      //button pdf excel print
      '<"top"<"d-flex justify-content-end"B>>' +
      '<"d-flex justify-content-between"l<"show-info">f>' +
      "rt" +
      '<"bottom"<"d-flex justify-content-between"ip>><"clear">',

    responsive: true,
    language: {
      paginate: {
        next: "Selanjutnya",
        previous: "Sebelumnya",
      },
      info: "Menampilkan _END_ data dari _TOTAL_  data",
      lengthMenu: "Menampilkan _MENU_ Data",
      search: "Cari:",
      entri: "Data",
      showInfo: "Menampilkan _START_ hingga _END_ dari _TOTAL_ Data",
      zeroRecords: "Tidak ada data yang ditemukan",
      infoEmpty: "Tidak ada data yang tersedia",
      show: "Tampilkan", // Ubah "show" menjadi "Tampilkan",
    },
    lengthMenu: [
      [5, 15, 30, 50, 100],
      [5, 15, 30, 50, 100],
    ],
    buttons: [
      {
        extend: "pdf",
        text: '<i class="fas fa-file-pdf"></i> Unduh PDF', // Teks tombol dengan ikon
        className: "btn btn-danger", // Gaya tombol
        filename: "Rekap Evaluasi Semua Kelas", // Nama file yang diunduh
        title: "Rekap Evaluasi Semua Kelas", // Judul  khusus
        customize: function (doc) {
          doc.defaultStyle.fontSize = 12;
          doc.content[1].table.widths = ["*", "*", "*", "*", "*", "*"]; // Ukuran kolom tabel

          // Mengubah tampilan head tabel pada file PDF
          var colCount = doc.content[1].table.body[0].length;
          for (var i = 0; i < colCount; i++) {
            doc.content[1].table.body[0][i].fillColor = "#C5F3FD"; // Warna latar belakang head tabel
            doc.content[1].table.body[0][i].color = "black"; // Warna teks head tabel
          }
        },
      },
      {
        extend: "excel",
        text: '<i class="fa-sharp fa-solid fa-file-excel"></i> Buat Excel', // Teks tombol dengan ikon
        className: "btn btn-success", // Gaya tombol
        filename: "Rekap Evaluasi Semua Kelas", // Nama file yang diunduh
        title: "Rekap Evaluasi Semua Kelas", // Judul  khusus
      },
      {
        extend: "print",
        text: '<i class="fa-sharp fa-solid fa-print"></i> Cetak Print', // Teks tombol dengan ikon
        title: "Rekap Evaluasi Semua Kelas", // Judul cetak khusus
        className: "btn btn-secondary", // Gaya tombol
        customize: function (win) {
          // Mengubah gaya cetak
          $(win.document.body).addClass("new-print-style");
          $(win.document.body).find("table").addClass("new-print-table");
        },
      },
    ],
  });
});

$(document).ready(function () {
  $("#cari").click(function () {
    if ($("#kelas").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Mohon Maaf",
        text: "Tidak ada kelas yang dipilih",
      });
    } else {
      getDataSiswa.then((users) => {
        $("#example").DataTable().clear().destroy(); //menghapus data tabel terdahulu
        const tampilData = document.querySelector("#dataEvaluasi");
        for (let user in users) {
          if (users[user].evaluasi) {
            if (users[user].kelas == $("#kelas option:selected").text()) {
              const tr = `
                <tr data-id=${user}>
                  <td class="text-center">${users[user].nisn}</td>
                  <td class="text-capitalize text-center">${users[user].nama}</td>
                  <td class="text-center">${users[user].kelas}</td>
                  <td class="text-center">${users[user].evaluasi.skor}</td>
                  <td class="text-center">${users[user].evaluasi.waktu}</td>
                  <td class="text-center">${users[user].evaluasi.tanggal}</td>
                </tr>
              `;

              tampilData.innerHTML += tr;
            }
          }
        }

        $("#example").DataTable({
          dom:
            '<"top"<"d-flex justify-content-end"B>>' +
            '<"d-flex justify-content-between"l<"show-info">f>' +
            "rt" +
            '<"bottom"<"d-flex justify-content-between"ip>><"clear">',
          responsive: true,
          language: {
            paginate: {
              next: "Selanjutnya",
              previous: "Sebelumnya",
            },
            info: "Menampilkan _END_ data dari _TOTAL_  data",
            lengthMenu: "Menampilkan _MENU_ Data",
            search: "Cari:",
            entri: "Data",
            showInfo: "Menampilkan _START_ hingga _END_ dari _TOTAL_ Data",
            zeroRecords: "Tidak ada data yang ditemukan",
            infoEmpty: "Tidak ada data yang tersedia",
            show: "Tampilkan", // Ubah "show" menjadi "Tampilkan",
          },
          lengthMenu: [
            [5, 15, 30, 50, 100],
            [5, 15, 30, 50, 100],
          ],
          buttons: [
            {
              extend: "pdf",
              text: '<i class="fas fa-file-pdf"></i> Unduh PDF', // Teks tombol dengan ikon
              className: "btn btn-danger", // Gaya tombol
              filename:
                "Rekap Evaluasi Kelas " + $("#kelas option:selected").text(), // Nama file yang diunduh
              title:
                "Rekap Evaluasi Kelas " + $("#kelas option:selected").text(), // Judul  khusus
              customize: function (doc) {
                doc.defaultStyle.fontSize = 12;
                doc.content[1].table.widths = ["*", "*", "*", "*", "*", "*"]; // Ukuran kolom tabel

                // Mengubah tampilan head tabel pada file PDF
                var colCount = doc.content[1].table.body[0].length;
                for (var i = 0; i < colCount; i++) {
                  doc.content[1].table.body[0][i].fillColor = "#C5F3FD"; // Warna latar belakang head tabel
                  doc.content[1].table.body[0][i].color = "black"; // Warna teks head tabel
                }
              },
            },
            {
              extend: "excel",
              text: '<i class="fa-sharp fa-solid fa-file-excel"></i> Buat Excel', // Teks tombol dengan ikon
              className: "btn btn-success", // Gaya tombol
              filename:
                "Rekap Evaluasi Kelas " + $("#kelas option:selected").text(), // Nama file yang diunduh
              title:
                "Rekap Evaluasi Kelas " + $("#kelas option:selected").text(), // Judul  khusus
            },
            {
              extend: "print",
              text: '<i class="fa-sharp fa-solid fa-print"></i> Cetak Print', // Teks tombol dengan ikon
              title:
                "Rekap Evaluasi Kelas " + $("#kelas option:selected").text(), // Judul cetak khusus
              className: "btn btn-secondary", // Gaya tombol
              customize: function (win) {
                // Mengubah gaya cetak
                $(win.document.body).addClass("new-print-style");
                $(win.document.body).find("table").addClass("new-print-table");
              },
            },
          ],
        });
      });
    }
  });
});
