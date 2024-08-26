// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { tanggalDefault, tampilanWaktu } from "../asset/tanggal.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADUmOEWb7NE5pWV-BwHfAt7pF-IV3PP2U",
  authDomain: "heredity-86b90.firebaseapp.com",
  databaseURL: "https://heredity-86b90-default-rtdb.firebaseio.com",
  projectId: "heredity-86b90",
  storageBucket: "heredity-86b90.appspot.com",
  messagingSenderId: "61653132520",
  appId: "1:61653132520:web:106995cc62a7be388a955d",
  measurementId: "G-P991YR1DP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

//menghubungkan dg database
const db = getDatabase();

const auth = getAuth();

const nomorSoal = document.querySelector(".nomor-soal");
const pilihanGanda = document.querySelector(".pilihan-ganda");
const lanjutEvaluasi = document.querySelector(".lanjut-evaluasi");
const kembaliEvaluasi = document.querySelector(".kembali-evaluasi");
const kotakSoalEvaluasi = document.querySelectorAll(".kotak-soal-evaluasi");
const mulaiKuis = document.querySelector(".mulai-kuis");
const btnHome = document.querySelector(".home");

let nama = localStorage.getItem("nama");
let nisn = localStorage.getItem("nisns");
let kelas = localStorage.getItem("kelas");

getUsername();
hasil();

// Functions
function hasil() {
  onValue(ref(db, `UserSiswa/${nisn}/kuis/kuis-1`), (snapshot) => {
    const data = snapshot.val();
    if (data[`skor`] == "") {
      mulaiKuis.innerHTML += `
      <div class="card-body">
          <h3 class="text-center">Petunjuk Pengerjaan Kuis 1</h3>
          <hr>
          <ol>
            <li class="mb-1 lh-lg">Kuis 1 terdiri dari 10 soal berupa pilihan ganda.</li>
            <li class="mb-1 lh-lg">Setiap soal memiliki bobot nilai sebesar 10.</li>
            <li class="mb-1 lh-lg">Tekan tombol "<b>Mulai</b>" untuk mulai mengerjakan kuis.</li>
            <li class="mb-1 lh-lg">Jawablah soal dengan menekan pilihan jawaban yang dianggap benar.</li>
            <li class="mb-1 lh-lg">Waktu pengerjaan adalah 30 menit. Jika waktu pengerjaan habis, maka tampilan akan beralih ke halaman hasil.</li>
            <li class="mb-1 lh-lg">Setelah semua pertanyaan selesai dijawab, tekan tombol "Selesai" dan halaman hasil akan muncul.</li>
            <li class="lh-lg">Selesaikan semua soal sebelum waktu habis karena jika waktu habis maka secara otomatis kuis akan tertutup</li>
          </ol>
          <hr>
          <a class="d-md-flex justify-content-md-end text-decoration-none " href="kuis1 copy.html">
              <button class="btn_cekJawaban" id="mulaiKuiss"><b>Mulai</b></button>
          </a>
      </div>`;
      const btnMulaiKuis = document.getElementById("mulaiKuiss");
      btnMulaiKuis.addEventListener("click", () => {
        update(ref(db, `UserSiswa/${nisn}/kuis`), {
          "kuis-1": {
            skor: "",
            tanggal: "",
            waktu: "",
          },
        }).then(() => {
          location.href = "kuis1 copy.html";
        });
      });
    } else {
      mulaiKuis.innerHTML += `
      <div class="card-body">
        <h3 class="text-center">Hasil Kuis 1</h3>
        <hr>
        
        <div id="ketLulus"></div>
    
        <div class="d-md-flex text-center mt-3">
            <div class="boxPenting" style="width: 150px;">
                Jawaban Salah
                <h1 class="text-danger">${10 - data[`skor`] / 10}</h1>

                <hr>

                Jawaban Benar
                <h1>${data[`skor`] / 10}</h1>
            </div>
            <div class="boxPenting align-middle" style="width: 150px;">
                Nilai
                <h1>${data[`skor`]}</h1>
            </div>

        </div>
        <hr>

        <div class="d-md-flex justify-content-md-center text-decoration-none tombol-hasil-kuis">
          <a href="/html/materi.html" class="btn btn-secondary mx-2" tabindex="-1" role="button">Ulang Materi <i class="fas fa-undo-alt"></i></a>
          <button href="kuis1 copy.html" class="btn btn-danger mx-2" id="ulangi-kuis" >Ulang Kuis <i class="fas fa-undo-alt"></i></button>
        </div>
      </div>`;

      onValue(ref(db, `kkm/kuis1/`), (snapshot) => {
        const dataKKM = snapshot.val();
        const ketLulus = `<div class="card-body-ketLulus text-center">
        <h5>Selamat Nilai Kamu Sangat Bagus!</h5>
        Mari Kita pelajari materi selanjutnya
        </div>`;

        const ketTDKLulus = `<div class="card-body-ketTDKLulus text-center">
        <h5>Mohon Maaf Nilai Kamu di Bawah KKM (<span>${dataKKM.kkm}</span>)</h5>
        Silahkan belajar lagi dan tetap semangat!
        </div>`;

        if (data[`skor`] >= dataKKM.kkm) {
          $("#ketLulus").html(ketLulus);
        } else {
          $("#ketLulus").html(ketTDKLulus);
        }
      });

      const ulangiKuis = document.getElementById("ulangi-kuis");
      ulangiKuis.addEventListener("click", () => {
        update(ref(db, `UserSiswa/${nisn}/kuis`), {
          "kuis-1": {
            skor: "",
            tanggal: "",
            waktu: "",
          },
        }).then(() => {
          location.href = "kuis1.html";
        });
      });
    }
  });
}
function getUsername() {
  if (nama == null) {
    swal("Mohon Maaf", "Kamu Harus Login Terlebih dahulu", "error").then(() => {
      document.location.href = "../../index.html";
    });
  } else {
    onValue(ref(db, "Soal/Soal_Kuis_1"), (snapshot) => {
      // const pilihanGanda = document.querySelector(".pilihan-ganda");
      const data = snapshot.val();
      // const kkm = snapshot.val().kkm;

      // Menampilkan soal
      const dbjawaban = [];
      for (let i = 1; i <= 10; i++) {
        const tampilanSoal = i != 1 ? "d-none" : "";
        pilihanGanda.innerHTML += `
          <div class="div-soal ${tampilanSoal} px-2">
              <div ${data[`Soal_Kuis_1_${i}`].tmpl_img}>
                  <div class="imagessKuis"><img src="${
                    data[`Soal_Kuis_1_${i}`].gambar
                  }" class="rounded mx-auto d-block" width="20%"></div>
              </div>
  
              <div class="lg-lh text-break mx-2 soalteks" id="soalTeks${i}">${
          data[`Soal_Kuis_1_${i}`]["teks-soal"]
        }</div>

              <div class = "div-pilgan">
                <label for="${i}a" class="label-${i} d-block" >
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}a" name="no${i}" value="a" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} piliha">a. ${
          data[`Soal_Kuis_1_${i}`].a
        }</div>
                </label>
                
                <label for="${i}b" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}b" name="no${i}" value="b" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihb">b. ${
          data[`Soal_Kuis_1_${i}`].b
        }</div>
                </label>
                
                <label for="${i}c" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}c" name="no${i}" value="c" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihc">c. ${
          data[`Soal_Kuis_1_${i}`].c
        }</div>
                </label>
                
                <label for="${i}d" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}d" name="no${i}" value="d" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihd">d. ${
          data[`Soal_Kuis_1_${i}`].d
        }</div>
                </label>
                
              </div>
          </div>
          `;
        dbjawaban[i - 1] = data[`Soal_Kuis_1_${i}`].kuncijwb;

        MathJax.typesetPromise($(".soalteks")).catch((err) => console.log(err)); //agar mathjax berfungsi
        MathJax.typesetPromise($(".pilihan-jawaban")).catch((err) =>
          console.log(err)
        ); //agar mathjax berfungsi
      }

      let soalKe = 1;
      nomorSoal.innerHTML = `${soalKe}`;
      const divSoal = document.querySelectorAll(".div-soal");

      // Perulangan kotak soal saat mengklik jawaban
      for (let i = 1; i <= 10; i++) {
        const labelPilihanGanda = pilihanGanda.querySelectorAll(`.label-${i}`);
        for (let j = 0; j < labelPilihanGanda.length; j++) {
          labelPilihanGanda[j].addEventListener("click", function () {
            kotakSoalEvaluasi[i - 1].classList.add("btn-nomor-sudah-dijawab");
          });
        }
      }

      // Perulangan perpindahan kotak soal akibat di klik
      for (let i = 0; i < 10; i++) {
        kotakSoalEvaluasi[i].addEventListener("click", function () {
          soalKe = i + 1;
          gantiSoal(i + 1);
          nomorSoal.innerHTML = `${i + 1}`;
        });
      }

      const jawabanSiswaSemua = [];
      for (let i = 1; i <= 10; i++) {
        const labelPilihanGanda = pilihanGanda.querySelectorAll(`.label-${i}`); //50
        let jawabanSiswa;
        for (let j = 0; j < labelPilihanGanda.length; j++) {
          labelPilihanGanda[j].addEventListener("click", () => {
            let pilihan = labelPilihanGanda[j].querySelector(
              `.radio-pilihan-ganda-${i}`
            ).value;
            jawabanSiswa = pilihan;
            jawabanSiswaSemua[i] = pilihan;

            set(ref(db, `UserSiswa/${nisn}/kuis/kuis-1/nomor/${i}`), {
              jawaban: pilihan,
            });
          });
        }
      }

      lanjutEvaluasi.addEventListener("click", function () {
        if (soalKe == divSoal.length) {
          soalKe = 1;
        } else {
          soalKe++;
        }
        gantiSoal(soalKe);
        nomorSoal.innerHTML = `${soalKe}`;
      });

      kembaliEvaluasi.addEventListener("click", function () {
        if (soalKe == 1) {
          soalKe = divSoal.length;
        } else {
          soalKe--;
        }
        gantiSoal(soalKe);
        nomorSoal.innerHTML = `${soalKe}`;
      });

      btnHome.addEventListener("click", function () {
        swal({
          title: "Apakah Kamu sudah yakin ingin meninggalkan kuis",
          icon: "warning",
          teks: "Jika Kamu keluar maka pekerjaan Kamu tidak tersimpan",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            location.href = "materi1_kuis.html";
            sessionStorage.removeItem("waktu");
          }
        });
      });
      //fungsi untuk ganti soal
      function gantiSoal(soalKe) {
        const kotakSoalEvaluasi = document.querySelectorAll(
          ".kotak-soal-evaluasi"
        );
        for (let i = 0; i < divSoal.length; i++) {
          divSoal[i].classList.add("d-none");
          kotakSoalEvaluasi[i].classList.remove("soal-sedang-dibuka");
        }
        divSoal[soalKe - 1].classList.remove("d-none");
        kotakSoalEvaluasi[soalKe - 1].classList.add("soal-sedang-dibuka");
      }

      onValue(ref(db, `UserSiswa/${nisn}/kuis/kuis-1/nomor/`), (snapshot) => {
        // Mengambil data jawaban siswa pada db
        const semuaJawabanSiswaDB = snapshot;
        const siswajwb = [];
        if (semuaJawabanSiswaDB.val() != null) {
          semuaJawabanSiswaDB.forEach((jawabanSiswaDB) => {
            const soalBerjawab = jawabanSiswaDB.key;
            const jawabannya = jawabanSiswaDB.val().jawaban;

            siswajwb[soalBerjawab - 1] = jawabannya;
            const radioPilihanGanda = document.querySelectorAll(
              `.radio-pilihan-ganda-${soalBerjawab}`
            );
            const pilihanradio = document.querySelectorAll(
              `.pilihan-jawaban-${soalBerjawab}`
            );
            // console.log("panjang radio " + radioPilihanGanda.length);
            for (let i = 0; i < radioPilihanGanda.length; i++) {
              if (radioPilihanGanda[i].id == `${soalBerjawab}${jawabannya}`) {
                pilihanradio[i].classList.add("pilihan-jawaban-dipilih");
                radioPilihanGanda[i].checked = true;
                kotakSoalEvaluasi[soalBerjawab - 1].classList.add(
                  "btn-nomor-sudah-dijawab"
                );
              } else {
                pilihanradio[i].classList.remove("pilihan-jawaban-dipilih");
              }
            }
          });
        }

        // Fungsi pengecekan yang akan dijalankan setiap detik
        function checkEverySecond() {
          let siswaWaktu = sessionStorage.getItem("waktu");
          // Lakukan tindakan pengecekan di sini
          if (siswaWaktu == null) {
            clearInterval(interval);
            let benar = 0;
            const dbtanggal = tanggalDefault();
            const dbwaktu = tampilanWaktu();
            for (let j = 0; j < dbjawaban.length; j++) {
              if (dbjawaban[j] == siswajwb[j]) {
                benar += 1;
              }
            }

            update(ref(db, `UserSiswa/${nisn}/kuis/kuis-1`), {
              selesai: true,
              skor: benar * 10,
              tanggal: dbtanggal,
              waktu: dbwaktu,
            });
          }
        }
        // Panggil fungsi checkEverySecond setiap detik
        var interval = setInterval(checkEverySecond, 1000);

        // kirim jawaban dan skor
        const submit = document.getElementById("submit-evaluasi");
        submit.addEventListener("click", () => {
          const sudahDijawab = document.querySelectorAll(
            ".pilihan-jawaban-dipilih"
          );
          let benar = 0;
          const dbtanggal = tanggalDefault();
          const dbwaktu = tampilanWaktu();

          if (sudahDijawab.length < 10) {
            swal(
              "Cek Kembali Jawaban Kamu",
              "Masih ada soal yang belum terjawab",
              "error"
            );
            return;
          } else {
            swal({
              title: "Apakah Kamu sudah yakin dengan jawabannya?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                for (let j = 0; j < dbjawaban.length; j++) {
                  if (dbjawaban[j] == siswajwb[j]) {
                    benar += 1;
                  }
                }

                update(ref(db, `UserSiswa/${nisn}/kuis/kuis-1`), {
                  selesai: true,
                  skor: benar * 10,
                  tanggal: dbtanggal,
                  waktu: dbwaktu,
                });
                location.href = "materi1_kuis.html";
                sessionStorage.removeItem("waktu");
              }
            });
          }
        });
      });
    });
  }
}
