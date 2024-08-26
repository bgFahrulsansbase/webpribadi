function tanggalDefault() {
  const arrbulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const arrHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const date = new Date();

  const hari = date.getDay();
  const tanggal = date.getDate();
  const bulan = date.getMonth();
  const tahun = date.getFullYear();

  const fortmat =
    arrHari[hari] + ", " + tanggal + " " + arrbulan[bulan] + " " + tahun;
  return fortmat;
}
function tampilanWaktu() {
  const dWaktu = new Date();
  const detik = dWaktu.getSeconds();
  const menit = dWaktu.getMinutes();
  const jam = dWaktu.getHours();

  const fortmat = jam + ":" + menit + ":" + detik;
  return fortmat;
}

export { tanggalDefault, tampilanWaktu };
