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

const dbmenanya1 = db
  .ref("db_menanya1/")
  .on("value", menanya1Success, handleError);
let pk1 = 0;
var counter = 0;
function menanya1Success(items1) {
  pk1 = items1.val().length;
  counter = pk1;
}

const dbmengkomunikasikan1 = db
  .ref("db_mengkomunikasikan1/")
  .on("value", mengkomunikasikan1Success, handleError);
let pk2 = 0;
var counter2 = 0;
function mengkomunikasikan1Success(items1) {
  pk2 = items1.val().length;
  counter2 = pk2;
}

function handleError(error) {
  console.log(error);
}

// ambil jamnya
window.setTimeout("waktu()", 1000);

function waktu() {
  var tanggal = new Date();
  setTimeout("waktu()", 1000);
  return (
    tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds()
  );
}

// harinya
function hari() {
  tanggallengkap = new String();
  namahari = "Minggu Senin Selasa Rabu Kamis Jumat Sabtu";
  namahari = namahari.split(" ");
  namabulan =
    "Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember";
  namabulan = namabulan.split(" ");
  tgl = new Date();
  hari = tgl.getDay();
  tanggal = tgl.getDate();
  bulan = tgl.getMonth();
  tahun = tgl.getFullYear();
  tanggallengkap =
    namahari[hari] + ", " + tanggal + " " + namabulan[bulan] + " " + tahun;
  return tanggallengkap;
}

// harinya
function hari2() {
  tanggallengkap = new String();
  namahari = "Minggu Senin Selasa Rabu Kamis Jumat Sabtu";
  namahari = namahari.split(" ");
  namabulan =
    "Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember";
  namabulan = namabulan.split(" ");
  tgl = new Date();
  hari = tgl.getDay();
  tanggal = tgl.getDate();
  bulan = tgl.getMonth();
  tahun = tgl.getFullYear();
  tanggallengkap =
    namahari[hari] + ", " + tanggal + " " + namabulan[bulan] + " " + tahun;
  return tanggallengkap;
}

function createMenanya1(
  nama,
  nisn,
  sekolah,
  kelas,
  menanya1_1,
  jmenanya1_1,
  menanya1_2,
  jmenanya1_2,
  menanya1_3,
  jmenanya1_3,
  menanya1_4,
  jmenanya1_4,
  waktunya,
  hari
) {
  var task = {
    id: counter,
    nama: nama,
    nisn: nisn,
    sekolah: sekolah,
    kelas: kelas,
    menanya1_1: menanya1_1,
    jmenanya1_1: jmenanya1_1,
    menanya1_2: menanya1_2,
    jmenanya1_2: jmenanya1_2,
    menanya1_3: menanya1_3,
    jmenanya1_3: jmenanya1_3,
    menanya1_4: menanya1_4,
    jmenanya1_4: jmenanya1_4,
    nilai: 0,
    waktu: waktunya,
    hari: hari,
  };
  let database = firebase.database().ref("db_menanya1/" + counter);
  database.set(task);
}

function menanya1() {
  const menanya1_1 = document.getElementById("menanya1_1");
  const menanya1_2 = document.getElementById("menanya1_2");
  const menanya1_3 = document.getElementById("menanya1_3");
  const menanya1_4 = document.getElementById("menanya1_4");
  const jmenanya1_1 = document.getElementById("jmenanya1_1");
  const jmenanya1_2 = document.getElementById("jmenanya1_2");
  const jmenanya1_3 = document.getElementById("jmenanya1_3");
  const jmenanya1_4 = document.getElementById("jmenanya1_4");

  if (
    menanya1_1.value == "" ||
    menanya1_2.value == "" ||
    menanya1_3.value == "" ||
    menanya1_4.value == "" ||
    jmenanya1_1.value == "" ||
    jmenanya1_2.value == "" ||
    jmenanya1_3.value == "" ||
    jmenanya1_4.value == ""
  ) {
    Swal.fire({
      icon: "info",
      title: "Data Kosong",
      text: "Isilah semua kolom pertanyaan dan jawaban terlebih dahulu",
    });
  } else {
    let harinya = hari();
    let waktunya = waktu();
    let nama = sessionStorage.getItem("nama");
    let nisn = sessionStorage.getItem("nisn");
    let sekolah = sessionStorage.getItem("sekolah");
    let kelas = sessionStorage.getItem("kelas");

    createMenanya1(
      nama,
      nisn,
      sekolah,
      kelas,
      menanya1_1.value,
      jmenanya1_1.value,
      menanya1_2.value,
      jmenanya1_2.value,
      menanya1_3.value,
      jmenanya1_3.value,
      menanya1_4.value,
      jmenanya1_4.value,
      waktunya,
      harinya
    );

    Swal.fire({
      icon: "success",
      title: "Data Berhasil di Kirim",
      showConfirButton: false,
      timer: 1500,
    }).then(function () {
      const tabmencoba = document.getElementById("tabmencoba");
      tabmencoba.classList.add("active");
      const mencoba = document.getElementById("mencoba");
      mencoba.classList.add("active");
      mencoba.classList.add("show");

      const tabmenanya = document.getElementById("tabmenanya");
      tabmenanya.classList.remove("active");
      const menanya = document.getElementById("menanya");
      menanya.classList.remove("active");
      menanya.classList.remove("show");
    });
  }
}

function createMengkomunikasikan1(
  nama,
  nisn,
  sekolah,
  kelas,
  mengkomunikasikan1_1,
  mengkomunikasikan1_2,
  mengkomunikasikan1_3,
  waktunya,
  hari
) {
  var task = {
    id: counter2,
    nama: nama,
    nisn: nisn,
    sekolah: sekolah,
    kelas: kelas,
    mengkomunikasikan1_1: mengkomunikasikan1_1,
    mengkomunikasikan1_2: mengkomunikasikan1_2,
    mengkomunikasikan1_3: mengkomunikasikan1_3,
    nilai: 0,
    waktu: waktunya,
    hari: hari,
  };
  let database = firebase.database().ref("db_mengkomunikasikan1/" + counter2);
  database.set(task);
}

function mengkomunikasikan1() {
  const mengkomunikasikan1_1 = document.getElementById("mengkomunikasikan1_1");
  const mengkomunikasikan1_2 = document.getElementById("mengkomunikasikan1_2");
  const mengkomunikasikan1_3 = document.getElementById("mengkomunikasikan1_3");

  if (
    mengkomunikasikan1_1.value == "" ||
    mengkomunikasikan1_2.value == "" ||
    mengkomunikasikan1_3.value == ""
  ) {
    Swal.fire({
      icon: "info",
      title: "Silahkan Isi Semua Kolom Pertanyaan dan Jawaban",
    });
  } else {
    let harinya = hari2();
    let waktunya = waktu();
    let nama = sessionStorage.getItem("nama");
    let nisn = sessionStorage.getItem("nisn");
    let sekolah = sessionStorage.getItem("sekolah");
    let kelas = sessionStorage.getItem("kelas");

    createMengkomunikasikan1(
      nama,
      nisn,
      sekolah,
      kelas,
      mengkomunikasikan1_1.value,
      mengkomunikasikan1_2.value,
      mengkomunikasikan1_3.value,
      waktunya,
      harinya
    );

    Swal.fire({
      icon: "success",
      title: "Data Berhasil di Kirim",
      showConfirButton: false,
      Timer: 1500,
    }).then(function () {
      window.location = "kuis1.html";
    });
  }
}
