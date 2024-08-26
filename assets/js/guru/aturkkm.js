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
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

$(document).ready(function () {
  onValue(ref(db, "kkm/"), (snapshot) => {
    const dataKKm = snapshot.val();
    $(".kkm1").html(dataKKm.kuis1.kkm);
    $(".kkm2").html(dataKKm.kuis2.kkm);
    $(".kkm3").html(dataKKm.kuis3.kkm);
    $(".evaluasi").html(dataKKm.evaluasi.kkm);

    $(".btnkuis1").click(function () {
      $("#isiKKM1").val(dataKKm.kuis1.kkm);
    });

    $(".btnkuis2").click(function () {
      $("#isiKKM2").val(dataKKm.kuis2.kkm);
    });

    $(".btnkuis3").click(function () {
      $("#isiKKM3").val(dataKKm.kuis3.kkm);
    });

    $(".btnEvaluasi").click(function () {
      $("#isiKKMEvaluasi").val(dataKKm.evaluasi.kkm);
    });

    //set KKM 1
    $("#setbtnKuis1").click(function () {
      if ($("#isiKKM1").val() == "") {
        Swal.fire({
          icon: "warning",
          title: "Nilai Kosong",
          text: "Mohon Cek Kembali!",
        });
        return false;
      } else {
        update(ref(db, "kkm/kuis1"), {
          kkm: $("#isiKKM1").val(),
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Nilai KKM telah diperbarui",
          }).then(() => {
            $("#fromeditKKM1").modal("hide");
          });
        });
      }
    });

    //set KKM 2
    $("#setbtnKuis2").click(function () {
      if ($("#isiKKM2").val() == "") {
        Swal.fire({
          icon: "warning",
          title: "Nilai Kosong",
          text: "Mohon Cek Kembali!",
        });
        return false;
      } else {
        update(ref(db, "kkm/kuis2"), {
          kkm: $("#isiKKM2").val(),
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Nilai KKM telah diperbarui",
          }).then(() => {
            $("#fromeditKKM2").modal("hide");
          });
        });
      }
    });

    //set KKM 3
    $("#setbtnKuis3").click(function () {
      if ($("#isiKKM3").val() == "") {
        Swal.fire({
          icon: "warning",
          title: "Nilai Kosong",
          text: "Mohon Cek Kembali!",
        });
        return false;
      } else {
        update(ref(db, "kkm/kuis3"), {
          kkm: $("#isiKKM3").val(),
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Nilai KKM telah diperbarui",
          }).then(() => {
            $("#fromeditKKM3").modal("hide");
          });
        });
      }
    });

    //set KKM evaluasi
    $("#setbtnEvaluasi").click(function () {
      if ($("#isiKKMEvaluasi").val() == "") {
        Swal.fire({
          icon: "warning",
          title: "Nilai Kosong",
          text: "Mohon Cek Kembali!",
        });
        return false;
      } else {
        update(ref(db, "kkm/evaluasi"), {
          kkm: $("#isiKKMEvaluasi").val(),
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Nilai KKM telah diperbarui",
          }).then(() => {
            $("#fromeditKKMEvaluasi").modal("hide");
          });
        });
      }
    });
  });
});
