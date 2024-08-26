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
import { tanggalDefault, tampilanWaktu } from "../js/tanggal.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
let nisn = localStorage.getItem("nisn");
let kelas = localStorage.getItem("kelas");

getUsername();
hasil();

// Functions
function hasil() {
  onValue(ref(db, `UserSiswa/${nisn}/evaluasi`), (snapshot) => {
    const data = snapshot.val();
    if (data[`skor`] == "") {
      mulaiKuis.innerHTML += `
      <h4>Evaluasi</h4>
      <div class="kontenawal">
      <div class="petunjuk-kuis">
            <h5>Petunjuk Pengerjaan</h5>
            <ol>
              <li>Evaluasi terdiri dari 20 soal pilihan ganda.</li>
              <li>Setiap soal memiliki 5 poin.</li>
              <li>Untuk memulai evaluasi silahkan tekan tombol "Mulai Evaluasi".</li>
              <li>
                Bacalah soal dengan teliti dan pilih jawaban yang diangap paling
                benar.
              </li>
              <li>
                Setelah seluruh soal terjawab, silahkan tekan tombol "Selesai"
                untuk menyelesaikan evaluasi.
              </li>
            </ol>
          </div>
          <div class="data-siswa">
         
          <div class="isi-data-siswa">
  
            <p>
              Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              <span id="user-nama2"></span>
            </p>
            <p>
              NISN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              <span id="user-nisn"></span>
            </p>
            <p>
              Kelas &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              <span id="user-kelas"></span>
            </p>
            <a href="evaluasi-pilgan.html">
              <button class="btn-mulaikuis" id="mulaiKuiss"><i class="fa-solid fa-circle-play"></i>
                <b>Mulai Kuis</b>
              </button>
            </a>
          </div>
          </div>
          </div>`;
      // Update informasi pengguna di dalam spans
      document.getElementById("user-nama2").innerText = nama;
      document.getElementById("user-nisn").innerText = nisn;
      document.getElementById("user-kelas").innerText = kelas;

      const btnMulaiKuis = document.getElementById("mulaiKuiss");
      btnMulaiKuis.addEventListener("click", () => {
        update(ref(db, `UserSiswa/${nisn}`), {
          evaluasi: {
            skor: "",
            tanggal: "",
            waktu: "",
          },
        }).then(() => {
          location.href = "evaluasi-pilgan.html";
        });
      });
    } else if (data[`skor`] == 0 || data[`skor`] >= 0) {
      mulaiKuis.innerHTML += `
      <div class="card-hasil">
        <h6>Hasil Evaluasi</h6>
        <hr>
    
        <div class="d-md-flex text-center mt-3">
            <div class="boxPenting">
            Jawaban Benar
                <h1 class="text-success">${data[`skor`] / 5}</h1>
                <hr>    
            Jawaban Salah
                <h1 class="text-danger">${20 - data[`skor`] / 5}</h1>
        
            </div>
            <div class="boxPenting align-middle">
                Nilai
                <h1>${data[`skor`]}</h1>
            </div>

            </div>
            <div id="ketLulus"></div>
            <hr>
      
            <div class="btn-hasil-kuis">
              <button href="evaluasi-pilgan.html" id="ulangi-kuis" >Ulangi Kuis</button>
            </div>
      </div>`;

      onValue(ref(db, `kkm/evaluasi/`), (snapshot) => {
        const dataKKM = snapshot.val();
        const ketLulus = `<div class="card-body-ketLulus">
        <div class="text-display">
        <p><b>Selamat!</b> nilai Anda sangat bagus, pertahankan.</p>
        </div>
        </div>`;

        const ketTDKLulus = `<div class="card-body-ketTDKLulus">
        <div class="text-display">
        <p><b>Maaf,</b> nilai Anda di bawah KKM (<span>${dataKKM.kkm}</span>)  Silahkan belajar lagi dan tetap semangat!</p>   
        </div>
        </div>`;

        if (data[`skor`] >= dataKKM.kkm) {
          $("#ketLulus").html(ketLulus);
        } else {
          $("#ketLulus").html(ketTDKLulus);
        }
      });

      const ulangiKuis = document.getElementById("ulangi-kuis");
      ulangiKuis.addEventListener("click", () => {
        update(ref(db, `UserSiswa/${nisn}`), {
          evaluasi: {
            skor: "",
            tanggal: "",
            waktu: "",
          },
        }).then(() => {
          location.href = "evaluasi.html";
        });
      });
    }
  });
}
function getUsername() {
  if (nama == null) {
    // Menampilkan SweetAlert2 jika pengguna belum login
    Swal.fire({
      title: "Mohon Maaf",
      text: "Kamu Harus Login Terlebih dahulu",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      document.location.href = "../../index.html";
    });
  } else {
    onValue(ref(db, "Soal/Soal_Evaluasi"), (snapshot) => {
      // const pilihanGanda = document.querySelector(".pilihan-ganda");
      const data = snapshot.val();
      // const kkm = snapshot.val().kkm;

      // Menampilkan soal
      const dbjawaban = [];
      for (let i = 1; i <= 20; i++) {
        const tampilanSoal = i != 1 ? "d-none" : "";
        pilihanGanda.innerHTML += `
          <div class="div-soal ${tampilanSoal} px-2">
              <div ${data[`Soal_Evaluasi_${i}`].tmpl_img}>
                  <div class="imagessKuis"><img src="${
                    data[`Soal_Evaluasi_${i}`].gambar
                  }" class="rounded mx-auto d-block" width="20%"></div>
              </div>
  
              <div class="lg-lh text-break mx-2 soalteks" id="soalTeks${i}">${
          data[`Soal_Evaluasi_${i}`]["teks-soal"]
        }</div>

              <div class = "div-pilgan">
                <label for="${i}a" class="label-${i} d-block" >
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}a" name="no${i}" value="a" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} piliha">a. ${
          data[`Soal_Evaluasi_${i}`].a
        }</div>
                </label>
                
                <label for="${i}b" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}b" name="no${i}" value="b" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihb">b. ${
          data[`Soal_Evaluasi_${i}`].b
        }</div>
                </label>
                
                <label for="${i}c" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}c" name="no${i}" value="c" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihc">c. ${
          data[`Soal_Evaluasi_${i}`].c
        }</div>
                </label>
                
                <label for="${i}d" class="label-${i} d-block">
                  <input class="d-none radio-pilihan-ganda-${i}" type="radio" id="${i}d" name="no${i}" value="d" />
                  <div class="pilihan-jawaban pilihan-jawaban-${i} pilihd">d. ${
          data[`Soal_Evaluasi_${i}`].d
        }</div>
                </label>
                
              </div>
          </div>
          `;
        dbjawaban[i - 1] = data[`Soal_Evaluasi_${i}`].kuncijwb;

        MathJax.typesetPromise($(".soalteks")).catch((err) => console.log(err)); //agar mathjax berfungsi
        MathJax.typesetPromise($(".pilihan-jawaban")).catch((err) =>
          console.log(err)
        ); //agar mathjax berfungsi
      }

      let soalKe = 1;
      nomorSoal.innerHTML = `${soalKe}`;
      const divSoal = document.querySelectorAll(".div-soal");

      // Perulangan kotak soal saat mengklik jawaban
      for (let i = 1; i <= 20; i++) {
        const labelPilihanGanda = pilihanGanda.querySelectorAll(`.label-${i}`);
        for (let j = 0; j < labelPilihanGanda.length; j++) {
          labelPilihanGanda[j].addEventListener("click", function () {
            kotakSoalEvaluasi[i - 1].classList.add("btn-nomor-sudah-dijawab");
          });
        }
      }

      // Perulangan perpindahan kotak soal akibat di klik
      for (let i = 0; i < 20; i++) {
        kotakSoalEvaluasi[i].addEventListener("click", function () {
          soalKe = i + 1;
          gantiSoal(i + 1);
          nomorSoal.innerHTML = `${i + 1}`;
        });
      }

      const jawabanSiswaSemua = [];
      for (let i = 1; i <= 20; i++) {
        const labelPilihanGanda = pilihanGanda.querySelectorAll(`.label-${i}`); //50
        let jawabanSiswa;
        for (let j = 0; j < labelPilihanGanda.length; j++) {
          labelPilihanGanda[j].addEventListener("click", () => {
            let pilihan = labelPilihanGanda[j].querySelector(
              `.radio-pilihan-ganda-${i}`
            ).value;
            jawabanSiswa = pilihan;
            jawabanSiswaSemua[i] = pilihan;

            set(ref(db, `UserSiswa/${nisn}/evaluasi/nomor/${i}`), {
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

      onValue(ref(db, `UserSiswa/${nisn}/evaluasi/nomor/`), (snapshot) => {
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

            update(ref(db, `UserSiswa/${nisn}/evaluasi`), {
              selesai: true,
              skor: benar * 5,
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
            Swal.fire({
              title: "Cek kembali jawaban",
              text: "Masih ada soal yang belum terjawab",
              icon: "warning",
            });
            return;
          } else {
            Swal.fire({
              title: "Kirim Jawaban",
              text: "Apakah kamu yakin ingin mengirim jawaban?",
              icon: "question",
              showCancelButton: true,

              confirmButtonText: "Iya, kirim",
              cancelButtonText: "Tidak",
            }).then((result) => {
              if (result.isConfirmed) {
                for (let j = 0; j < dbjawaban.length; j++) {
                  if (dbjawaban[j] == siswajwb[j]) {
                    benar += 1;
                  }
                }

                update(ref(db, `UserSiswa/${nisn}/evaluasi`), {
                  selesai: true,
                  skor: benar * 5,
                  tanggal: dbtanggal,
                  waktu: dbwaktu,
                });
                location.href = "evaluasi.html";
                sessionStorage.removeItem("waktu");
              }
            });
          }
        });
      });
    });
  }
}
