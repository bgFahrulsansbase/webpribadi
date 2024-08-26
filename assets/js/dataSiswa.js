let nama = localStorage.getItem("nama");
let nisn = localStorage.getItem("nisns");
let kelas = localStorage.getItem("kelas");
// let absen = localStorage.getItem('absen');
// Deskripsi
let nama2 = document.querySelectorAll("#namaSiswa");
let nisn2 = document.querySelectorAll("#nisnSiswa");
let nisnProfil = document.querySelectorAll("#nisnProfil");
let abs2 = document.querySelectorAll("#absSiswa");
let kelas2 = document.querySelectorAll("#kelasSiswa");
//  var currentUser = null;

menampilkanIdentitas();
// Functions
function menampilkanIdentitas() {
  if (nama == null) {
    swal("Mohon Maaf", "Kamu Harus Login Terlebih dahulu", "error").then(() => {
      document.location.href = "../login-siswa.html";
    });
  } else {
    for (let i = 0; i < nama2.length; i++) {
      nama2[i].innerText = nama;
      nisnProfil[i].innerText = nisn;
      // abs2[i].innerText = absen;
    }
    for (let i = 0; i < nisn2.length; i++) {
      nisn2[i].innerText = nisn;
      kelas2[i].innerText = kelas;
    }
  }
}
// window.addEventListener('beforeunload', function() {
//   localStorage.clear();
// });
function LogOut() {
  Swal.fire({
    title: "Apakah Kamu sudah yakin ingin keluar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      location.href = "../login-siswa.html";
      localStorage.removeItem("nama");
      localStorage.removeItem("nisn");
      localStorage.removeItem("kelas");
      // sessionStorage.removeItem('absen');
    }
  });
}
