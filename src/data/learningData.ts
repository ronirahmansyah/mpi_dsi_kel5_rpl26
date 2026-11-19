import type {
  DndItem,
  GameMission,
  McQuestion,
  SimDataItem,
  StoryScene,
  TfQuestion,
  VideoCheckpoint,
} from '../types';

export const VIDEO_DURATION = 36;

export const STORY_SCENES: StoryScene[] = [
  {
    start: 0,
    end: 9,
    bg1: '#0f172a',
    bg2: '#1e3a8a',
    speaker: 'Narator & Raka',
    title: 'Adegan 1: Kartu Pelajar Baru Raka',
    subtitle:
      'Raka baru saja mendapat Kartu Pelajar SMP! Ia berencana memfoto kartunya dan langsung mengunggahnya ke Story Medsos.',
    narration:
      'Raka baru saja mendapat Kartu Pelajar SMP. Ia sangat senang dan ingin langsung mengunggah foto kartunya ke media sosial.',
  },
  {
    start: 9,
    end: 21,
    bg1: '#1e1b4b',
    bg2: '#312e81',
    speaker: 'Sinta (Detektif Siber)',
    title: 'Adegan 2: Peringatan dari Sinta',
    subtitle:
      'Tunggu Raka! Di kartu pelajar itu ada NISN, alamat rumah, dan tanggal lahir. Itu semua Informasi Privat yang berbahaya jika dilihat orang asing!',
    narration:
      'Tunggu Raka! Di kartu pelajar ada NISN, alamat rumah, dan tanggal lahir. Itu informasi privat yang berbahaya jika tersebar!',
  },
  {
    start: 21,
    end: 31,
    bg1: '#064e3b',
    bg2: '#047857',
    speaker: 'Raka',
    title: 'Adegan 3: Pilah Sebelum Posting!',
    subtitle:
      'Wah, untung diingatkan! Aku pilih memposting foto poster karyaku saja sebagai Informasi Publik, sementara data kartu pelajar kusimpan privat.',
    narration:
      'Untung diingatkan! Aku pilih memposting karya posterku sebagai informasi publik, sedangkan kartu pelajar kusimpan privat.',
  },
  {
    start: 31,
    end: 36,
    bg1: '#1e3a8a',
    bg2: '#6d28d9',
    speaker: 'Pesan Warga Digital',
    title: 'Adegan 4: Jadilah Warga Digital Cerdas!',
    subtitle:
      'Ingat selalu: Lindungi Informasi Privat, Bagikan Karya Positif sebagai Informasi Publik, dan Jaga Jejak Digitalmu!',
    narration:
      'Ingat selalu, lindungi informasi privat, bagikan karya positif, dan jaga jejak digitalmu!',
  },
];

export const VIDEO_CHECKPOINTS: VideoCheckpoint[] = [
  {
    time: 9.0,
    question:
      'Raka senang sekali menerima Kartu Pelajar SMP baru dan ingin mengunggah fotonya ke Story Media Sosial. Menurutmu, apakah foto Kartu Pelajar yang menampilkan NISN, tanggal lahir, dan alamat lengkap aman diunggah ke publik?',
    options: [
      'Aman saja, kan supaya teman-teman tahu kita sudah kelas 7.',
      'Tidak aman! NISN, tanggal lahir, dan alamat adalah informasi privat yang bisa disalahgunakan.',
    ],
    correctIndex: 1,
    feedbackOk:
      'Tepat sekali! Kartu identitas memuat data privat sensitif yang bisa dimanfaatkan penipu untuk pencurian identitas.',
    feedbackErr:
      'Kurang tepat! Foto kartu pelajar memuat data privat (NISN, alamat, tanggal lahir) yang berbahaya jika tersebar luas.',
  },
  {
    time: 21.0,
    question:
      'Sinta menyarankan agar Raka tetap bisa berbagi kabar gembira tanpa membocorkan data pribadi. Cara mana yang paling cerdas dilakukan Raka?',
    options: [
      'Menyensor/memburamkan (blur) bagian NISN, tanggal lahir, dan alamat, atau cukup memposting foto buku paket/karya poster.',
      "Memposting foto kartu pelajar apa adanya tapi menuliskan 'Tolong jangan disalahgunakan ya'.",
    ],
    correctIndex: 0,
    feedbackOk:
      'Cerdas! Menyensor data sensitif atau memilih foto karya/prestasi adalah cara menjaga privasi di ruang publik.',
    feedbackErr:
      'Hati-hati! Menulis imbauan saja tidak akan menghentikan penipu atau orang asing menyimpan foto datamu.',
  },
  {
    time: 31.0,
    question:
      "Selain menyaring postingan, Raka mengatur akun media sosialnya menjadi mode 'Privat' dan mengaktifkan 2FA. Apa manfaat utama langkah Raka?",
    options: [
      'Hanya teman dekat yang disetujui yang bisa melihat unggahan, dan akun terlindungi dari pembobolan.',
      'Supaya kuota internet menjadi gratis selamanya.',
    ],
    correctIndex: 0,
    feedbackOk:
      'Hebat! Pengaturan privasi akun dan 2FA membentengi data pribadi dan menjaga jejak digitalmu tetap bersih.',
    feedbackErr:
      'Bukan itu ya! Mode privat dan 2FA berfungsi melindungi unggahan dan akun dari orang asing serta peretas.',
  },
];

export const GAME_MISSIONS: GameMission[] = [
  {
    id: 1,
    category: 'Informasi Privat vs. Publik',
    icon: '🪪',
    title: 'Kasus 1: Foto Kartu Pelajar di Medsos',
    scenario:
      'Kamu baru saja lolos masuk SMP impian dan mendapatkan Kartu Pelajar baru yang mencantumkan NISN, tanggal lahir, dan alamat rumah lengkap. Kamu ingin merayakannya di media sosial.',
    options: [
      {
        label: 'Memfoto kartu pelajar lalu memburamkan (blur) NISN, tanggal lahir, dan alamatnya sebelum diunggah.',
        isCorrect: true,
      },
      {
        label: 'Mengunggah foto kartu pelajar secara utuh dan jelas agar semua followers bisa membacanya.',
        isCorrect: false,
      },
      {
        label: 'Mengirim foto kartu pelajar dan NIK orang tua ke kolom komentar akun artis.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Keren! Memburamkan bagian sensitif (NISN, alamat, tanggal lahir) melindungi data privatmu dari pencurian identitas.',
    feedbackErr:
      'Waduh, berbahaya! NISN, tanggal lahir, dan alamat rumah adalah informasi privat yang bisa disalahgunakan orang jahat.',
  },
  {
    id: 2,
    category: 'Waspada Phishing',
    icon: '🎣',
    title: 'Kasus 2: Tautan Hadiah Game Gratis',
    scenario:
      'Saat bermain game online, muncul chat dari akun asing: "Selamat! Kamu terpilih mendapat 5.000 Diamond Gratis! Klik link bit.ly/klaim-hadiah-cepat lalu login pakai email & password akunmu sekarang!"',
    options: [
      {
        label: 'Langsung klik link dan masukkan email beserta password agar diamond cepat masuk.',
        isCorrect: false,
      },
      {
        label: 'Mengabaikan pesan, tidak mengklik tautan mencurigakan, dan memblokir/melaporkan akun pengirim.',
        isCorrect: true,
      },
      {
        label: 'Membagikan link tersebut ke grup kelas supaya teman-teman ikut mencoba.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Tepat! Itu adalah jebakan Phishing untuk mencuri akunmu. Pengembang game resmi tidak pernah meminta password lewat link mencurigakan.',
    feedbackErr:
      'Hati-hati, kamu terkena jebakan Phishing! Jangan pernah memasukkan password di tautan tidak resmi.',
  },
  {
    id: 3,
    category: 'Keamanan Akun & OTP',
    icon: '🔐',
    title: 'Kasus 3: Permintaan Kode OTP Mendesak',
    scenario:
      'Tiba-tiba ada pesan WhatsApp dari nomor tak dikenal yang mengaku sebagai pihak sekolah: "Halo, ada kesalahan data rapor. Tolong kirimkan 6 digit kode OTP yang baru masuk ke SMS HP kamu sekarang juga!"',
    options: [
      {
        label: 'Segera membacakan dan mengirimkan 6 digit kode OTP karena pengirim mengaku dari sekolah.',
        isCorrect: false,
      },
      {
        label: 'Menolak memberikan kode OTP kepada siapa pun dan mengonfirmasi langsung ke wali kelas resmi.',
        isCorrect: true,
      },
      {
        label: 'Membuat story di Instagram berisi screenshot kode OTP tersebut untuk bertanya ke teman.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Mantap! Kode OTP (One-Time Password) sifatnya sangat rahasia seperti kunci rumah. Pihak resmi mana pun tidak boleh meminta OTP.',
    feedbackErr:
      'Bahaya besar! Memberikan atau memposting kode OTP sama saja menyerahkan kendali akunmu kepada penipu.',
  },
  {
    id: 4,
    category: 'Jejak Digital',
    icon: '👣',
    title: 'Kasus 4: Komentar Emosi di Video Viral',
    scenario:
      'Kamu melihat unggahan video seorang siswa dari sekolah lain yang melakukan kesalahan kecil saat lomba. Banyak warganet menuliskan komentar ejekan kasar. Bagaimana sikapmu?',
    options: [
      {
        label: 'Ikut berkomentar kasar memakai kata-kata ejekan karena akunmu memakai nama samaran.',
        isCorrect: false,
      },
      {
        label: 'Tidak ikut mengejek; jika berkomentar, pilih kalimat yang santun dan menyemangati agar jejak digital tetap positif.',
        isCorrect: true,
      },
      {
        label: 'Menyimpan videonya lalu mengeditnya menjadi meme olok-olok untuk diunggah ulang.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Luar biasa! Komentar positif menjaga kesehatan ruang digital dan membangun jejak digital yang membanggakan di masa depan.',
    feedbackErr:
      'Jangan lakukan itu! Perundungan digital (cyberbullying) meninggalkan jejak digital buruk yang sulit dihapus.',
  },
  {
    id: 5,
    category: 'Keamanan Kata Sandi',
    icon: '🔑',
    title: 'Kasus 5: Teman Meminta Password Akun',
    scenario:
      'Teman sebangkumu ingin meminjam akun belajarmu untuk melihat catatan, lalu ia meminta username dan password email pribadimu yang juga terhubung ke media sosial.',
    options: [
      {
        label: 'Memberikan password email pribadi karena percaya dia teman dekat.',
        isCorrect: false,
      },
      {
        label: 'Menolak dengan sopan untuk berbagi password, dan cukup membagikan file catatan tugas lewat fitur share/kirim dokumen.',
        isCorrect: true,
      },
      {
        label: 'Menuliskan password di papan tulis kelas agar mudah diingat bersama.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Sangat bijak! Kata sandi bersifat sangat privat dan tidak boleh dibagikan ke siapa pun, termasuk teman dekat.',
    feedbackErr:
      'Kurang aman! Berbagi kata sandi berisiko menyebabkan penyalahgunaan akun jika suatu saat terjadi perselisihan atau HP teman diretas.',
  },
  {
    id: 6,
    category: 'Etika & Anti-Doxing',
    icon: '📍',
    title: 'Kasus 6: Berbagi Lokasi & Data Teman',
    scenario:
      'Saat kerja kelompok di rumah teman bernama Edo, kamu berfoto di depan pagar rumahnya yang terlihat jelas nomor rumah dan nama jalannya. Kamu ingin mempostingnya.',
    options: [
      {
        label: 'Langsung memposting beserta tag lokasi GPS rumah Edo tanpa bertanya dulu.',
        isCorrect: false,
      },
      {
        label: 'Tidak menampilkan nomor rumah/nama jalan serta meminta izin Edo terlebih dahulu sebelum memposting foto kebersamaan.',
        isCorrect: true,
      },
      {
        label: 'Menambahkan nomor HP Edo dan jadwal pulang orang tuanya di caption.',
        isCorrect: false,
      },
    ],
    feedbackOk:
      'Hebat! Menghormati privasi orang lain dan tidak menyebarkan alamat pribadi (anti-doxing) adalah ciri warga digital berakhlak.',
    feedbackErr:
      'Hati-hati! Menyebarkan alamat dan lokasi detail rumah orang lain tanpa izin termasuk pelanggaran privasi (doxing).',
  },
];

export const SIM_DATA_ITEMS: SimDataItem[] = [
  {
    id: 'sim-nama-panggilan',
    label: 'Nama Panggilan & Hobi (Futsal / Menggambar)',
    detail: 'Informasi umum untuk perkenalan di ruang publik virtual.',
    recommended: 'publik',
    riskWeight: 0,
    positiveWeight: 20,
    publicImpact: 'Aman & Positif: Membantu teman baru mengenali minat positifmu.',
    privateImpact: 'Netral: Disimpan privat tidak berbahaya, tapi aman juga untuk dibagikan.',
  },
  {
    id: 'sim-karya-poster',
    label: 'Karya Poster Edukasi & Prestasi Lomba Sekolah',
    detail: 'Hasil karya tugas Informatika atau piagam juara kelas.',
    recommended: 'publik',
    riskWeight: 0,
    positiveWeight: 30,
    publicImpact: 'Sangat Positif (+30): Membangun portofolio jejak digital yang membanggakan!',
    privateImpact: 'Disimpan sendiri: Aman, namun kamu melewatkan peluang jejak digital positif.',
  },
  {
    id: 'sim-alamat-rumah',
    label: 'Alamat Lengkap Rumah & Patokan Gang',
    detail: 'Jl. Melati No. 14 RT 03/RW 05 lengkap dengan titik lokasi GPS.',
    recommended: 'privat',
    riskWeight: 25,
    positiveWeight: 0,
    publicImpact: 'BAHAYA TINGGI (-25%): Orang asing atau penguntit dapat melacak tempat tinggalmu!',
    privateImpact: 'Aman 🔒: Lokasi tempat tinggalmu terlindungi dari penguntitan (stalking).',
  },
  {
    id: 'sim-no-hp',
    label: 'Nomor HP / WhatsApp Pribadi',
    detail: '0812-xxxx-xxxx yang terhubung ke akun belajar dan dompet digital.',
    recommended: 'privat',
    riskWeight: 20,
    positiveWeight: 0,
    publicImpact: 'RISIKO SPAM (-20%): Rentan mendapat pesan penipuan (phishing) dan telepon asing.',
    privateImpact: 'Aman 🔒: Terhindar dari spam, penipuan OTP, dan kontak orang tak dikenal.',
  },
  {
    id: 'sim-nik-nisn',
    label: 'Foto Kartu Pelajar (NISN & Tanggal Lahir)',
    detail: 'Identitas resmi sekolah yang memuat angka NISN dan tanggal lahir lengkap.',
    recommended: 'privat',
    riskWeight: 25,
    positiveWeight: 0,
    publicImpact: 'BAHAYA IDENTITAS (-25%): NISN & tanggal lahir bisa dipakai penipu untuk membobol akun!',
    privateImpact: 'Aman 🔒: Data identitas kependidikanmu tetap rahasia dan terlindungi.',
  },
  {
    id: 'sim-password',
    label: 'Kata Sandi & Kode OTP Akun',
    detail: 'Kunci akses rahasia untuk masuk ke email, game, dan media sosial.',
    recommended: 'privat',
    riskWeight: 30,
    positiveWeight: 0,
    publicImpact: 'KRITIS (-30%): Akunmu bisa langsung diambil alih oleh peretas dalam hitungan detik!',
    privateImpact: 'Aman 🔒: Kunci akses akun terjaga 100% hanya untuk dirimu.',
  },
  {
    id: 'sim-jadwal-kosong',
    label: 'Info "Rumah Lagi Kosong, Orang Tua Keluar Kota"',
    detail: 'Update status lokasi secara real-time saat keluarga bepergian.',
    recommended: 'privat',
    riskWeight: 20,
    positiveWeight: 0,
    publicImpact: 'RISIKO KEAMANAN FISIK (-20%): Memberi tahu orang jahat bahwa rumahmu sedang kosong.',
    privateImpact: 'Aman 🔒: Keamanan rumah dan keluargamu tetap terjaga.',
  },
  {
    id: 'sim-review-buku',
    label: 'Ulasan Buku / Tips Belajar Informatika',
    detail: 'Tulisan singkat tentang manfaat belajar literasi digital.',
    recommended: 'publik',
    riskWeight: 0,
    positiveWeight: 25,
    publicImpact: 'Sangat Positif (+25): Menginspirasi teman sebaya dan memperindah rekam jejak digital.',
    privateImpact: 'Aman: Disimpan untuk catatan pribadi.',
  },
];

export const MC_QUESTIONS: McQuestion[] = [
  {
    id: 1,
    stimulus:
      '<strong>Stimulus Soal 1:</strong> Rina baru membuat akun media sosial untuk mengunggah karya gambar digitalnya. Di halaman profil, aplikasi meminta Rina mengisi biodata yang akan terlihat oleh semua pengunjung internet.',
    question:
      'Manakah kombinasi informasi yang AMAN untuk ditampilkan secara publik di bio profil Rina?',
    options: [
      'Nama panggilan, hobi menggambar, dan nama kota secara umum',
      'Nama lengkap, nomor telepon pribadi, dan alamat rumah lengkap',
      'Tanggal lahir lengkap, NISN, dan foto Kartu Pelajar yang jelas',
      'Nama panggilan, kata sandi akun, dan lokasi GPS rumah saat ini',
    ],
    correctIndex: 0,
    explanation:
      'Nama panggilan, hobi, dan kota secara umum aman sebagai informasi publik. Alamat rumah, nomor HP, NISN, tanggal lahir lengkap, dan password wajib dirahasiakan.',
  },
  {
    id: 2,
    stimulus:
      '<strong>Stimulus Soal 2:</strong> Andi ingin membuat kata sandi baru untuk akun portal belajar sekolah agar tidak mudah ditebak oleh peretas maupun aplikasi penebak sandi otomatis.',
    question:
      'Dari keempat pilihan berikut, manakah kata sandi yang PALING KUAT dan aman?',
    options: [
      'andi12345',
      '17082012',
      'Bintang_Kejora#27',
      'passwordandi',
    ],
    correctIndex: 2,
    explanation:
      '"Bintang_Kejora#27" memenuhi syarat kata sandi kuat: panjang minimal 8 karakter dan memadukan huruf kapital, huruf kecil, angka, serta simbol.',
  },
  {
    id: 3,
    stimulus:
      '<strong>Stimulus Soal 3:</strong> Saat sedang membaca berita di situs web gratis, tiba-tiba muncul jendela peringatan berkedip bertuliskan: <em>"SELAMAT! HP Anda menang undian Smartphone Terbaru! Klik di sini dan masukkan nomor kartu ATM orang tua serta kode OTP untuk verifikasi."</em>',
    question:
      'Fenomena penipuan digital yang dialami pengguna pada stimulus di atas disebut dengan istilah...',
    options: [
      'Backup data',
      'Phishing',
      'Enkripsi',
      'Firewall',
    ],
    correctIndex: 1,
    explanation:
      'Phishing adalah teknik penipuan dengan menyamar sebagai pihak resmi/hadiah menarik untuk memancing korban menyerahkan data sensitif (password, OTP, atau data perbankan).',
  },
  {
    id: 4,
    stimulus:
      '<strong>Stimulus Soal 4:</strong> Dika tidak pernah mengunggah foto apa pun di internet. Namun, setiap sore ia mencari video tutorial merakit robot lewat mesin pencari dan mengklik berbagai situs web toko elektronik.',
    question:
      'Ketika Dika membuka kembali media sosialnya keesokan hari, muncul banyak iklan komponen robot. Mengapa hal ini dapat terjadi?',
    options: [
      'Kamera HP Dika merekam suara percakapannya secara diam-diam tanpa internet',
      'Teman sekelas Dika sengaja membocorkan riwayat pencariannya',
      'Aktivitas Dika terekam otomatis sebagai Jejak Digital Pasif melalui cookies dan riwayat pencarian',
      'Mesin pencari hanya menampilkan iklan robot kepada seluruh siswa SMP di Indonesia',
    ],
    correctIndex: 2,
    explanation:
      'Riwayat pencarian, cookies browser, dan alamat IP terekam secara otomatis menjadi Jejak Digital Pasif, yang sering digunakan platform untuk menampilkan iklan sesuai minat pengguna.',
  },
  {
    id: 5,
    stimulus:
      '<strong>Stimulus Soal 5:</strong> Pada sebuah grup chat kelas, terjadi perdebatan antara Beni dan Tono. Karena kesal, Beni memotret Kartu Tanda Penduduk (KTP) kakak Tono yang sempat tertinggal lalu menyebarkannya ke media sosial terbuka agar warganet menyerang rumah Tono.',
    question:
      'Tindakan Beni menyebarkan identitas pribadi milik orang lain tanpa izin di internet dikenal sebagai...',
    options: [
      'Doxing, dan tindakan ini melanggar privasi serta dapat dikenakan sanksi hukum',
      'Netiket, karena bertujuan melatih keterbukaan di ruang publik virtual',
      'Autentikasi dua faktor untuk membantu verifikasi alamat',
      'Jejak digital aktif yang positif bagi reputasi Beni',
    ],
    correctIndex: 0,
    explanation:
      'Menyebarkan informasi pribadi seseorang (alamat, identitas, nomor HP) tanpa izin dengan niat buruk disebut Doxing dan melanggar privasi serta hukum (UU PDP / UU ITE).',
  },
];

export const DND_ITEMS: DndItem[] = [
  {
    id: 'dnd-1',
    number: 6,
    text: 'Nomor Induk Siswa Nasional (NISN) & Tanggal Lahir Lengkap',
    correctZone: 'privat',
    explanation: 'NISN dan tanggal lahir lengkap adalah identitas resmi yang wajib dijaga privat.',
  },
  {
    id: 'dnd-2',
    number: 7,
    text: 'Poster Digital Bertema Lingkungan Karya Nisa',
    correctZone: 'publik',
    explanation: 'Karya kreatif untuk lomba aman dan positif bila dibagikan sebagai informasi publik.',
  },
  {
    id: 'dnd-3',
    number: 8,
    text: 'Alamat Lengkap Rumah Beserta Titik GPS Rumah',
    correctZone: 'privat',
    explanation: 'Alamat rumah dan GPS rumah bersifat privat demi keselamatan diri dari penguntit.',
  },
  {
    id: 'dnd-4',
    number: 9,
    text: 'Hobi Membaca Komik Sains & Prestasi Juara Lomba Melukis',
    correctZone: 'publik',
    explanation: 'Hobi dan prestasi positif aman dipublikasikan untuk membangun jejak digital baik.',
  },
  {
    id: 'dnd-5',
    number: 10,
    text: 'Kata Sandi Email & Kode Verifikasi OTP',
    correctZone: 'privat',
    explanation: 'Password dan kode OTP adalah kunci rahasia akun yang tidak boleh diketahui siapa pun.',
  },
];

export const TF_QUESTIONS: TfQuestion[] = [
  {
    id: 11,
    statement:
      'Menggunakan kata sandi yang sama di semua akun seperti "bima12052013" adalah kebiasaan yang aman karena mudah diingat saat terburu-buru.',
    correctAnswer: false,
    explanation:
      'SALAH. Sandi yang memakai nama + tanggal lahir mudah ditebak, dan memakai 1 sandi untuk semua akun berbahaya karena jika 1 akun bocor, semua akun lain ikut bobol.',
  },
  {
    id: 12,
    statement:
      'Mengakses aplikasi dompet digital menggunakan jaringan Wi-Fi publik gratis tanpa kata sandi di taman berisiko tinggi terhadap penyadapan data.',
    correctAnswer: true,
    explanation:
      'BENAR. Wi-Fi publik terbuka tidak terenkripsi dengan baik sehingga rawan disadap pihak ketiga; hindari transaksi sensitif atau login akun penting di Wi-Fi publik.',
  },
  {
    id: 13,
    statement:
      'Pesan dari akun tak dikenal yang menawarkan hadiah sepatu gratis dan meminta Bima memasukkan kode OTP SMS merupakan ciri serangan Phishing.',
    correctAnswer: true,
    explanation:
      'BENAR. Iming-iming hadiah gratis untuk mencuri OTP atau login adalah modus klasik Phishing.',
  },
  {
    id: 14,
    statement:
      'Jejak digital yang sudah diunggah ke internet (misalnya komentar atau foto) pasti langsung hilang permanen dari seluruh dunia jika kita menekan tombol "Hapus" setelah 1 jam.',
    correctAnswer: false,
    explanation:
      'SALAH. Sebelum dihapus, orang lain bisa saja sudah mengambil tangkapan layar (screenshot), mengunduh, atau menyebarkannya ulang.',
  },
  {
    id: 15,
    statement:
      'Mengaktifkan Autentikasi Dua Faktor (2FA) membantu melindungi akun Bima karena peretas tetap membutuhkan kode verifikasi tambahan meski mengetahui kata sandinya.',
    correctAnswer: true,
    explanation:
      'BENAR. 2FA memberikan lapisan keamanan ganda sehingga akun tetap terlindungi meski kata sandi sempat bocor.',
  },
];
