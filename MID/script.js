const themeSwitch = document.getElementById("themeSwitch");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);
themeSwitch.checked = savedTheme === "dark";
themeSwitch.addEventListener("change", () => {
  const theme = themeSwitch.checked ? "dark" : "light";
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

// Simpan data mahasiswa (menggunakan localStorage untuk contoh)
let mahasiswaData = JSON.parse(localStorage.getItem("mahasiswaData")) || [];

// Form Reset
function resetForm() {
  document.getElementById("formMahasiswa").reset();
  document.getElementById("formDataMahasiswa").reset();
  document.getElementById("searchNIM").value = "";
  const kabKotaSelect = document.getElementById("kabKota");
  const kecamatanSelect = document.getElementById("kecamatan");
  const kelurahanSelect = document.getElementById("kelurahan");
  kabKotaSelect.innerHTML =
    '<option selected disabled value="">Pilih Kab/Kota</option>';
  kecamatanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kecamatan</option>';
  kelurahanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kelurahan/Desa</option>';
  kabKotaSelect.disabled = true;
  kecamatanSelect.disabled = true;
  kelurahanSelect.disabled = true;
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));
}

// Panggil resetForm saat halaman dimuat untuk memastikan form bersih
document.addEventListener("DOMContentLoaded", () => {
  resetForm();
});

// Dynamic Location Dropdowns
const locationData = {
  "Jawa Barat": {
    Bandung: {
      Cidadap: ["Cimahi"],
      Sukajadi: ["Sukamaju"],
    },
    Bogor: {
      "Bogor Selatan": ["Bondongan"],
    },
  },
  "Jawa Timur": {
    Surabaya: {
      Tegalsari: ["Kedungdoro"],
      Genteng: ["Embong Kaliasin"],
    },
  },
  "DKI Jakarta": {
    Jakarta: {
      "Kebayoran Baru": ["Kebayoran Lama"],
      Tebet: ["Cempaka Putih"],
    },
  },
};

const propinsiSelect = document.getElementById("propinsi");
const kabKotaSelect = document.getElementById("kabKota");
const kecamatanSelect = document.getElementById("kecamatan");
const kelurahanSelect = document.getElementById("kelurahan");

propinsiSelect.addEventListener("change", () => {
  const propinsi = propinsiSelect.value;
  kabKotaSelect.innerHTML =
    '<option selected disabled value="">Pilih Kab/Kota</option>';
  kecamatanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kecamatan</option>';
  kelurahanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kelurahan/Desa</option>';
  kabKotaSelect.disabled = true;
  kecamatanSelect.disabled = true;
  kelurahanSelect.disabled = true;

  if (propinsi && locationData[propinsi]) {
    for (const kabKota in locationData[propinsi]) {
      const option = document.createElement("option");
      option.value = kabKota;
      option.textContent = kabKota;
      kabKotaSelect.appendChild(option);
    }
    kabKotaSelect.disabled = false;
  }
});

kabKotaSelect.addEventListener("change", () => {
  const propinsi = propinsiSelect.value;
  const kabKota = kabKotaSelect.value;
  kecamatanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kecamatan</option>';
  kelurahanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kelurahan/Desa</option>';
  kecamatanSelect.disabled = true;
  kelurahanSelect.disabled = true;

  if (kabKota && locationData[propinsi][kabKota]) {
    for (const kecamatan in locationData[propinsi][kabKota]) {
      const option = document.createElement("option");
      option.value = kecamatan;
      option.textContent = kecamatan;
      kecamatanSelect.appendChild(option);
    }
    kecamatanSelect.disabled = false;
  }
});

kecamatanSelect.addEventListener("change", () => {
  const propinsi = propinsiSelect.value;
  const kabKota = kabKotaSelect.value;
  const kecamatan = kecamatanSelect.value;
  kelurahanSelect.innerHTML =
    '<option selected disabled value="">Pilih Kelurahan/Desa</option>';
  kelurahanSelect.disabled = true;

  if (kecamatan && locationData[propinsi][kabKota][kecamatan]) {
    locationData[propinsi][kabKota][kecamatan].forEach((kelurahan) => {
      const option = document.createElement("option");
      option.value = kelurahan;
      option.textContent = kelurahan;
      kelurahanSelect.appendChild(option);
    });
    kelurahanSelect.disabled = false;
  }
});

// Fungsi untuk mengisi form dengan data yang ditemukan
function isiForm(data) {
  document.getElementById("nim").value = data.nim;
  document.getElementById("nama").value = data.nama;
  document.getElementById("tempatLahir").value = data.tempatLahir;
  document.getElementById("tanggalLahir").value = data.tanggalLahir;
  document.getElementById("jenisKelamin").value = data.jenisKelamin;
  document.getElementById("namaIbu").value = data.namaIbu;
  document.getElementById("nik").value = data.nik;
  document.getElementById("nisn").value = data.nisn;
  document.getElementById("alamat").value = data.alamat;
  document.getElementById("propinsi").value = data.propinsi;

  const propinsiEvent = new Event("change");
  propinsiSelect.dispatchEvent(propinsiEvent);
  kabKotaSelect.value = data.kabKota;

  const kabKotaEvent = new Event("change");
  kabKotaSelect.dispatchEvent(kabKotaEvent);
  kecamatanSelect.value = data.kecamatan;

  const kecamatanEvent = new Event("change");
  kecamatanSelect.dispatchEvent(kecamatanEvent);
  kelurahanSelect.value = data.kelurahan;

  document.getElementById("rt").value = data.rt;
  document.getElementById("rw").value = data.rw;
  document.getElementById("kodePos").value = data.kodePos;
  document.getElementById("jenisTinggal").value = data.jenisTinggal;
  document.getElementById("alatTransportasi").value = data.alatTransportasi;
  document.getElementById("golonganDarah").value = data.golonganDarah;
  document.getElementById("agama").value = data.agama;
}

// Fungsi pencarian berdasarkan NIM
function cariData() {
  const searchNIM = document.getElementById("searchNIM").value;
  const searchError = document.getElementById("searchNIM-error");

  if (!/^\d{11}$/.test(searchNIM)) {
    searchError.style.display = "block";
    return;
  } else {
    searchError.style.display = "none";
  }

  const data = mahasiswaData.find((item) => item.nim === searchNIM);

  if (data) {
    isiForm(data);
  } else {
    alert("Data dengan NIM tersebut tidak ditemukan!");
    resetForm();
  }
}

// Simpan Data
function simpanData() {
  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const tempatLahir = document.getElementById("tempatLahir").value;
  const tanggalLahir = document.getElementById("tanggalLahir").value;
  const jenisKelamin = document.getElementById("jenisKelamin").value;
  const namaIbu = document.getElementById("namaIbu").value;
  const nik = document.getElementById("nik").value;
  const nisn = document.getElementById("nisn").value;
  const alamat = document.getElementById("alamat").value;
  const propinsi = document.getElementById("propinsi").value;
  const kabKota = document.getElementById("kabKota").value;
  const kecamatan = document.getElementById("kecamatan").value;
  const kelurahan = document.getElementById("kelurahan").value;
  const rt = document.getElementById("rt").value;
  const rw = document.getElementById("rw").value;
  const kodePos = document.getElementById("kodePos").value;
  const jenisTinggal = document.getElementById("jenisTinggal").value;
  const alatTransportasi = document.getElementById("alatTransportasi").value;
  const golonganDarah = document.getElementById("golonganDarah").value;
  const agama = document.getElementById("agama").value;

  // Validation
  const forms = [
    document.getElementById("formMahasiswa"),
    document.getElementById("formDataMahasiswa"),
  ];
  let isValid = true;
  forms.forEach((form) => {
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid").forEach((input) => {
        input.nextElementSibling.style.display = "block";
      });
      isValid = false;
    }
  });

  if (!isValid) {
    alert("Harap lengkapi dan perbaiki semua field!");
    return;
  }

  // Simpan data ke localStorage
  const data = {
    nim,
    nama,
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    namaIbu,
    nik,
    nisn,
    alamat,
    propinsi,
    kabKota,
    kecamatan,
    kelurahan,
    rt,
    rw,
    kodePos,
    jenisTinggal,
    alatTransportasi,
    golonganDarah,
    agama,
  };

  const existingIndex = mahasiswaData.findIndex((item) => item.nim === nim);
  if (existingIndex !== -1) {
    mahasiswaData[existingIndex] = data;
  } else {
    mahasiswaData.push(data);
  }
  localStorage.setItem("mahasiswaData", JSON.stringify(mahasiswaData));

  alert("Data berhasil disimpan!");
  resetForm(); // Reset form setelah simpan
}
