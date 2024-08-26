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
  const antri = query(ref(db, "UserSiswa/"), orderByChild("V A"));
  onValue(antri, (snapshot) => {
    const users = snapshot.val();
    resolve(users);
  });
});

$(document).ready(function () {
  $("#cari").click(function () {
    let fixKelas = "";
    let fixMengomunikasikan = "";

    if ($("#kelas").val() == "" || $("#mengomunikasikan").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Mohon Maaf",
        text: "Tidak ada kelas/topik yang dipilih",
      });
    } else {
      getDataSiswa.then((users) => {
        $("#example3").DataTable().clear().destroy();
        const tampilData = document.querySelector("#tabelData");

        for (let user in users) {
          if (users[user].mengomunikasikan) {
            if (users[user].kelas == $("#kelas option:selected").text()) {
              // Membuat baris tabel (tr) dengan menggunakan data pengguna
              const tr = `
              <tr data-id=${user}>
              <td class="text-center">${users[user].nisn}</td>
              <td class="text-capitalize text-center">${users[user].nama}</td>
              <td class="text-center">${users[user].kelas}</td>
              <td class="text-jwb">${
                users[user].mengomunikasikan[
                  $("#mengomunikasikan option:selected").val()
                ].jawaban
              }</td>
            
              <td class="text-center">
                <div class="input-container">
                <input type="number" class="nilai-input" data-user-id=${user} placeholder=" ${
                users[user].mengomunikasikan[
                  $("#mengomunikasikan option:selected").val()
                ].nilai || "Masukkan Nilai"
              }" />
                <span class="nilai-display"></span> 
               
                </div>
              </td>
              <td class="text-center">     
              <div class="input-container">
                  <textarea class="catatan-input" data-user-id="${user}" placeholder="${
                users[user].mengomunikasikan[
                  $("#mengomunikasikan option:selected").val()
                ].catatan || "Tambahkan Catatan"
              }"></textarea>
              </div>      
             </td>
          
            </tr>  
              `;

              // Menambahkan baris tabel ke elemen dengan id "tabelData"
              tampilData.innerHTML += tr;
            }
          }
        }

        $("#example3").DataTable({
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
            [5, 10, 20, 30, 40],
            [5, 10, 20, 30, 40],
          ],
          columnDefs: [
            { width: "8%", targets: 0 },
            { width: "8%", targets: 2 },
            { width: "30%", targets: 3 },
          ], //mengatur lebar kolom tabel nama siswa
          buttons: [
            {
              extend: "pdf",
              text: '<i class="fas fa-file-pdf"></i> Unduh PDF', // Teks tombol dengan ikon
              className: "btn btn-danger", // Gaya tombol
              filename:
                "Lembar " +
                "Mengomunikasikan " +
                $("#mengomunikasikan option:selected").text() +
                " Kelas " +
                $("#kelas option:selected").text(), // Nama file yang diunduh
              title:
                "Lembar " +
                "Mengomunikasikan " +
                $("#mengomunikasikan option:selected").text() +
                " Kelas " +
                $("#kelas option:selected").text(), // Judul  khusus
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
                "Lembar " +
                "Mengomunikasikan " +
                $("#mengomunikasikan option:selected").text() +
                " Kelas " +
                $("#kelas option:selected").text(), // Nama file yang diunduh
              title:
                "Lembar " +
                "Mengomunikasikan " +
                $("#mengomunikasikan option:selected").text() +
                " Kelas " +
                $("#kelas option:selected").text(), // Judul  khusus
            },
            {
              extend: "print",
              text: '<i class="fa-sharp fa-solid fa-print"></i> Cetak Print', // Teks tombol dengan ikon
              title:
                "Lembar " +
                "Mengomunikasikan " +
                $("#mengomunikasikan option:selected").text() +
                " Kelas " +
                $("#kelas option:selected").text(), // Judul cetak khusus
              className: "btn btn-secondary", // Gaya tombol
              customize: function (win) {
                // Mengubah gaya cetak
                $(win.document.body).addClass("new-print-style");
                $(win.document.body).find("table").addClass("new-print-table");
              },
            },
          ],
        });

        // Setelah inisialisasi DataTable, tambahkan event listener untuk input nilai
        // Setelah baris $("#tabelData").on("change", ".nilai-input", function () {
        $("#tabelData").on("change", ".nilai-input", function () {
          const userId = $(this).data("user-id");
          const nilai = $(this).val();
          const topikId = $("#mengomunikasikan").val();

          const userRef = ref(
            db,
            `UserSiswa/${userId}/mengomunikasikan/${topikId}`
          );

          // Tambahkan baris ini untuk menampilkan nilai di samping input field
          const nilaiDisplay = $("<span>").text(`${nilai}`);
          $(this).parent().append(nilaiDisplay);

          update(userRef, { nilai: nilai })
            .then(() => {
              console.log(
                `Nilai untuk user dengan ID ${userId} dan topik ${topikId} berhasil disimpan.`
              );
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          // Simpan nilai ke local storage
          const localStorageKey = `nilai_${userId}_${topikId}`;
          localStorage.setItem(localStorageKey, nilai);
        });

        // Pada saat halaman dimuat, cek local storage dan tampilkan nilai yang tersimpan
        $(window).on("load", function () {
          $(".nilai-input").each(function () {
            const userId = $(this).data("user-id");
            const topikId = $("#mengomunikasikan").val();
            const localStorageKey = `nilai_${userId}_${topikId}`;
            const nilai = localStorage.getItem(localStorageKey);

            if (nilai !== null) {
              $(this).val(nilai);
            }
          });
        });
      });
      $("#tabelData").on("change", ".catatan-input", function () {
        const userId = $(this).data("user-id");
        const catatan = $(this).val();
        const topikId = $("#mengomunikasikan").val();

        const userRef = ref(
          db,
          `UserSiswa/${userId}/mengomunikasikan/${topikId}`
        );

        update(userRef, { catatan: catatan })
          .then(() => {
            console.log(
              `Catatan untuk user dengan ID ${userId} dan topik ${topikId} berhasil disimpan.`
            );
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // Simpan catatan ke local storage
        const localStorageKey = `catatan_${userId}_${topikId}`;
        localStorage.setItem(localStorageKey, catatan);
      });

      $(".detailMengomunikasikan").html(
        $("#mengomunikasikan").find("option:selected").text()
      );
    }
  });

  function menampilkan(fixKelas, fixMengomunikasikan) {}
});
