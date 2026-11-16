AULA VIRTUAL - Farhan Fadillah

Struktur:
  index.html        halaman utama (memuat CSS + semua JS berurutan)
  css/style.css     gaya HUD, joystick, tombol kamera, kartu panel
  js/data.js        EDIT DI SINI: isi portofolio (PANELS), warna avatar (CFG), posisi panel (SPOTS)
  js/world.js       scene, lampu, lantai, dinding, pilar, podium
  js/hologram.js    hologram F-HOLO di tengah aula
  js/logos.js       logo BEI, Mandiri, Gunadarma (PNG tertanam; jangan diedit manual)
  js/ornaments.js   ornamen hologram + ikon logo di tiap panel
  js/panels.js      panel portofolio di dinding
  js/avatar.js      karakter 3D manusia + animasinya
  js/controls.js    keyboard, mouse, joystick, kamera, kartu detail
  js/assistant.js   asisten AI hologram Aria: avatar cewek + chat (jawaban dari data PANELS)
  js/intro.js       layar pembuka (tombol MASUK)
  js/main.js        loop animasi utama

Kontrol: WASD/panah jalan, Shift lari, seret mouse putar kamera 360 derajat,
scroll zoom, V ganti kamera orang pertama/ketiga, E buka panel, T ngobrol dengan Aria (dekati avatar cewek hologram).

Cara pakai:
  - Klik dua kali index.html (perlu internet untuk memuat three.js dari CDN).
  - Atau unggah seluruh isi folder ke GitHub Pages (index.html harus di root).
Catatan: urutan <script> di index.html penting, jangan diubah.
