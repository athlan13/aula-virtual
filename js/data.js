/* Data portofolio & pengaturan avatar (edit di sini) */

// Warna avatar (ubah agar mirip aslinya)
const CFG={skin:0xd9a47c,hair:0x15110f,shirt:0x1e3a8a,pants:0x1f2937,shoes:0xf1f5f9};
const PANELS=[
  {t:'Profil',s:'Farhan Fadillah',c:'#7dd3fc',l:['Fresh graduate S1 Informatika, Universitas Gunadarma','Berdomisili di Cibitung, Kab. Bekasi','Minat: Data Analyst, IT Operations, Network Engineering']},
  {t:'Pendidikan',s:'Universitas Gunadarma · 2021–2025',c:'#a78bfa',l:['S1 Informatika, IPK 3.73','Fokus: jaringan, keamanan, dan data']},
  {t:'Magang di BEI',s:'IT Operations (System Management)',c:'#34d399',l:['PT Bursa Efek Indonesia','April – Agustus 2026','Mengelola dan memantau sistem operasional TI']},
  {t:'Magang Bank Mandiri',s:'IT Infrastruktur (Endpoint Management)',c:'#fbbf24',l:['PT Bank Mandiri (Persero) Tbk','Sejak Agustus 2026','Pengelolaan endpoint dan evaluasi solusi manajemen perangkat']},
  {t:'Skills',s:'Kemampuan teknis',c:'#f472b6',bars:[['Python',80],['PostgreSQL',75],['MongoDB',65],['Cisco',70],['Tableau',70],['Figma',60],['HTML + CSS',75],['MS Office',90]]},
  {t:'Skripsi',s:'Keamanan jaringan + Machine Learning',c:'#fb7185',l:['Klasifikasi keamanan lalu lintas jaringan','Metode: Random Forest']},
  {t:'Penulisan Ilmiah',s:'Pengembangan game',c:'#38bdf8',l:['Game 2D Android','Dibangun dengan Godot Engine']},
  {t:'Tools',s:'Teknologi yang dipakai',c:'#f97316',l:['Python, PostgreSQL, MongoDB','Cisco, Tableau, Figma','HTML, CSS, Microsoft Office']},
  {t:'Kontak',s:'Mari terhubung',c:'#22d3ee',l:['Terbuka untuk peluang Data Analyst, IT Operations, dan Network Engineering','Cibitung, Kab. Bekasi','Email / LinkedIn: isi di sini']}
];

// Posisi tiap panel di dinding: [x, z, rotasi]
const SPOTS=[[-9,-10.5,0],[0,-10.5,0],[9,-10.5,0],[-14.5,-6,Math.PI/2],[-14.5,0,Math.PI/2],[-14.5,6,Math.PI/2],[14.5,-6,-Math.PI/2],[14.5,0,-Math.PI/2],[14.5,6,-Math.PI/2]];
