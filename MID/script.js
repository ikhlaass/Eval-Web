function tampilkanData() {
  // Ambil data input dari form
  let nama = document.getElementById("nama").value;
  let tempatLahir = document.getElementById("tempatLahir").value;
  let tanggalLahir = document.getElementById("tanggalLahir").value;
  let jenisKelamin = document.getElementById("jenisKelamin").value;
  let namaIbu = document.getElementById("namaIbu").value;

  let nik = document.getElementById("nik").value;
  let nisn = document.getElementById("nisn").value;
  let alamat = document.getElementById("alamat").value;
  let propinsi = document.getElementById("propinsi").value;
  let kabKota = document.getElementById("kabKota").value;
  let kecamatan = document.getElementById("kecamatan").value;
  let kelurahan = document.getElementById("kelurahan").value;
  let rt = document.getElementById("rt").value;
  let rw = document.getElementById("rw").value;
  let kodePos = document.getElementById("kodePos").value;
  let jenisTinggal = document.getElementById("jenisTinggal").value;
  let alatTransportasi = document.getElementById("alatTransportasi").value;
  let golonganDarah = document.getElementById("golonganDarah").value;
  let agama = document.getElementById("agama").value;

  // Menampilkan data dalam format HTML
  let hasil = `
    <h4>Data Mahasiswa yang Dikirim:</h4>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Tempat Lahir:</strong> ${tempatLahir}</p>
    <p><strong>Tanggal Lahir:</strong> ${tanggalLahir}</p>
    <p><strong>Jenis Kelamin:</strong> ${
      jenisKelamin === "L" ? "Laki-laki" : "Perempuan"
    }</p>
    <p><strong>Nama Ibu:</strong> ${namaIbu}</p>
    <p><strong>NIK:</strong> ${nik}</p>
    <p><strong>NISN:</strong> ${nisn}</p>
    <p><strong>Alamat:</strong> ${alamat}</p>
    <p><strong>Propinsi:</strong> ${propinsi}</p>
    <p><strong>Kabupaten/Kota:</strong> ${kabKota}</p>
    <p><strong>Kecamatan:</strong> ${kecamatan}</p>
    <p><strong>Kelurahan/Desa:</strong> ${kelurahan}</p>
    <p><strong>RT:</strong> ${rt}</p>
    <p><strong>RW:</strong> ${rw}</p>
    <p><strong>Kode Pos:</strong> ${kodePos}</p>
    <p><strong>Jenis Tinggal:</strong> ${jenisTinggal}</p>
    <p><strong>Alat Transportasi:</strong> ${alatTransportasi}</p>
    <p><strong>Golongan Darah:</strong> ${golonganDarah}</p>
    <p><strong>Agama:</strong> ${agama}</p>
  `;

  document.getElementById("hasilData").innerHTML = hasil;
}
