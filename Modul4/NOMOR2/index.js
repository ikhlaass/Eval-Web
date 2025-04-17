document.getElementById("biodataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const tanggalLahir = document.getElementById("tanggalLahir").value;
  const jenisKelamin = document.querySelector('input[name="jk"]:checked').value;
  const agama = document.getElementById("agama").value;
  const alamat = document.getElementById("alamat").value;

  const output = `
          <h4>Data Biodata</h4>
          <p>NIM: ${nim}</p>
          <p>Nama: ${nama}</p>
          <p><Tanggal Lahir: ${tanggalLahir}</p>
          <p>Jenis Kelamin: ${jenisKelamin}</p>
          <p>Agama: ${agama}</p>
          <p>Alamat: ${alamat}</p>
        `;

  document.getElementById("dataOutput").innerHTML += output;
});
