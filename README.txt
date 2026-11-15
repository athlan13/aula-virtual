AULA VIRTUAL - Farhan Fadillah

Struktur:
  index.html        halaman utama (memuat CSS + semua JS berurutan)
  css/style.css     gaya HUD, joystick, kartu panel
  js/data.js        EDIT DI SINI: isi portofolio (PANELS), warna avatar (CFG), posisi panel (SPOTS)
  js/world.js       scene, lampu, lantai, dinding, pilar, podium
  js/hologram.js    hologram F-HOLO di tengah aula
  js/ornaments.js   ornamen hologram + ikon logo di tiap panel
  js/panels.js      panel portofolio di dinding
  js/avatar.js      karakter 3D manusia + animasinya
  js/controls.js    keyboard, mouse, joystick, kartu detail
  js/main.js        loop animasi utama

Cara pakai:
  - Klik dua kali index.html (perlu internet untuk memuat three.js dari CDN).
  - Atau unggah seluruh folder ke GitHub Pages (index.html harus di root).
Catatan: urutan <script> di index.html penting, jangan diubah.
