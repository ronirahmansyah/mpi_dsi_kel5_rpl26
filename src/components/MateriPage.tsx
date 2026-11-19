import { useState } from 'react';
import { BookOpen, CheckCircle2, Home, KeyRound, Lock, ShieldCheck } from 'lucide-react';

interface MateriPageProps {
  onBackHome: () => void;
  onCompleteAndNext: () => void;
  onMarkComplete: () => void;
  onPlayClick: () => void;
}

export function MateriPage({
  onBackHome,
  onCompleteAndNext,
  onMarkComplete,
  onPlayClick,
}: MateriPageProps) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [visited, setVisited] = useState<{ 1: boolean; 2: boolean; 3: boolean }>({
    1: true,
    2: false,
    3: false,
  });
  const [testPassword, setTestPassword] = useState('');

  const handleSwitchTab = (tab: 1 | 2 | 3) => {
    onPlayClick();
    setActiveTab(tab);
    const nextVisited = { ...visited, [tab]: true };
    setVisited(nextVisited);
    if (nextVisited[1] && nextVisited[2] && nextVisited[3]) {
      onMarkComplete();
    }
  };

  // Password strength calculation
  const getPasswordAnalysis = (val: string) => {
    if (!val) {
      return {
        score: 0,
        label: 'Ketik sandi percobaan',
        barColor: 'bg-slate-600',
        textColor: 'text-slate-300',
        tip: 'Tips: Campurkan huruf KAPITAL, huruf kecil, angka, dan simbol (@ # ! $).',
      };
    }

    let score = 0;
    if (val.length >= 8) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9]/.test(val)) score += 25;
    if (/[^A-Za-z0-9]/.test(val)) score += 25;

    if (score <= 25) {
      return {
        score,
        label: 'Lemah (Mudah Ditebak)',
        barColor: 'bg-red-500',
        textColor: 'text-red-300',
        tip: 'Bahaya! Perpanjang minimal 8 karakter dan tambahkan angka, huruf kapital, serta simbol.',
      };
    }
    if (score <= 75) {
      return {
        score,
        label: 'Sedang (Bisa Ditingkatkan)',
        barColor: 'bg-amber-400',
        textColor: 'text-amber-300',
        tip: 'Lumayan! Tambahkan simbol unik (seperti # atau !) dan variasi huruf besar-kecil agar lebih kebal.',
      };
    }
    return {
      score,
      label: 'Sangat Kuat',
      barColor: 'bg-emerald-400',
      textColor: 'text-emerald-300',
      tip: 'Hebat! Kata sandi ini memenuhi panjang ≥8 karakter dengan huruf kapital, angka, dan simbol.',
    };
  };

  const pwAnalysis = getPasswordAnalysis(testPassword);

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Materi Pembelajaran Interaktif</h2>
            <p className="text-sm text-slate-600">
              Pelajari ketiga sub-bab di bawah ini secara berurutan.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Menu Utama</span>
        </button>
      </div>

      {/* Interactive Segmented Sub-Chapter Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2">
        <button
          type="button"
          onClick={() => handleSwitchTab(1)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 1
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>1. Informasi Privat vs. Publik</span>
        </button>
        <button
          type="button"
          onClick={() => handleSwitchTab(2)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 2
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>2. Keamanan Data Pribadi</span>
        </button>
        <button
          type="button"
          onClick={() => handleSwitchTab(3)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 3
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <KeyRound className="h-4 w-4" />
          <span>3. Jejak Digital</span>
        </button>
      </div>

      {/* TAB 1: INFORMASI PRIVAT VS PUBLIK */}
      {activeTab === 1 && (
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-xs font-semibold text-blue-700">Sub-bab 1 · Klasifikasi Data</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Informasi Privat vs. Informasi Publik
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Saat kamu bermain media sosial, mengirim chat di grup, atau mendaftar game online,
                tidak semua hal tentang dirimu boleh diketahui orang asing.
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-slate-800">
                  <strong className="text-amber-900">🔒 Informasi Privat (Rahasia):</strong> Data
                  identitas sensitif yang bisa disalahgunakan untuk kejahatan jika bocor ke publik.
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-slate-800">
                  <strong className="text-emerald-900">🌐 Informasi Publik (Boleh Dibagikan):</strong>{' '}
                  Informasi umum atau karya positif yang aman dilihat banyak orang dan tidak
                  membahayakan keselamatanmu.
                </div>
              </div>
            </div>

            <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <svg
                viewBox="0 0 280 185"
                className="w-full max-w-xs"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Diagram perbandingan informasi privat dan publik"
              >
                <rect
                  x="12"
                  y="18"
                  width="118"
                  height="148"
                  rx="14"
                  fill="#FFF7ED"
                  stroke="#F97316"
                  strokeWidth="2.2"
                />
                <circle cx="71" cy="58" r="21" fill="#F97316" />
                <rect x="62" y="56" width="18" height="14" rx="3" fill="white" />
                <path
                  d="M65 56V51C65 47.7 67.7 45 71 45C74.3 45 77 47.7 77 51V56"
                  stroke="white"
                  strokeWidth="2.4"
                  fill="none"
                />
                <text x="71" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9A3412">
                  PRIVAT
                </text>
                <text x="71" y="118" textAnchor="middle" fontSize="10" fill="#C2410C">
                  NIK, Alamat, PIN,
                </text>
                <text x="71" y="132" textAnchor="middle" fontSize="10" fill="#C2410C">
                  Password, NISN
                </text>
                <text x="71" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">
                  JANGAN SEBAR!
                </text>

                <rect
                  x="150"
                  y="18"
                  width="118"
                  height="148"
                  rx="14"
                  fill="#ECFDF5"
                  stroke="#10B981"
                  strokeWidth="2.2"
                />
                <circle cx="209" cy="58" r="21" fill="#10B981" />
                <circle cx="209" cy="58" r="11" stroke="white" strokeWidth="2" fill="none" />
                <ellipse cx="209" cy="58" rx="5" ry="11" stroke="white" strokeWidth="1.8" fill="none" />
                <line x1="198" y1="58" x2="220" y2="58" stroke="white" strokeWidth="1.8" />
                <text x="209" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065F46">
                  PUBLIK
                </text>
                <text x="209" y="118" textAnchor="middle" fontSize="10" fill="#047857">
                  Hobi, Karya Poster,
                </text>
                <text x="209" y="132" textAnchor="middle" fontSize="10" fill="#047857">
                  Prestasi Lomba
                </text>
                <text x="209" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669">
                  AMAN DIBAGIKAN
                </text>
              </svg>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">
              Tabel Perbandingan &amp; Contoh Nyata Siswa SMP
            </h4>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspek</th>
                    <th className="px-4 py-3 font-semibold">Informasi Privat 🔒</th>
                    <th className="px-4 py-3 font-semibold">Informasi Publik 🌐</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold text-slate-900">Tujuan</td>
                    <td className="px-4 py-3 text-slate-600">
                      Hanya untuk diri sendiri, orang tua, atau pihak resmi (sekolah/bank).
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Untuk perkenalan wajar, berbagi karya, dan inspirasi di dunia maya.
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">Contoh Data Diri</td>
                    <td className="px-4 py-3 text-slate-600">
                      Alamat lengkap rumah, nomor HP pribadi, tanggal lahir lengkap, NIK/NISN.
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Nama panggilan, hobi (futsal/menggambar), kota asal secara umum.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold text-slate-900">Contoh Unggahan</td>
                    <td className="px-4 py-3 text-slate-600">
                      Foto Kartu Pelajar yang jelas, foto tiket perjalanan (ada barcode), lokasi{' '}
                      <em>live</em> rumah.
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Foto piala lomba kelas, poster tugas Informatika, ulasan buku bacaan.
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">Risiko Jika Bocor</td>
                    <td className="px-4 py-3 text-slate-600">
                      Penipuan, peretasan akun, penguntitan (<em>stalking</em>), hingga pencurian
                      identitas.
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Aman, bahkan bisa membangun citra diri positif.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleSwitchTab(2)}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              Lanjut ke Sub-bab 2 →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: KEAMANAN DATA PRIBADI */}
      {activeTab === 2 && (
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Sub-bab 2 · Proteksi Akun</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Keamanan Data Pribadi di Dunia Maya
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Data pribadi adalah aset berharga di era digital. Terapkan 4 langkah utama berikut
                agar akun dan datamu tetap aman dari peretas:
              </p>

              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                <li className="rounded-xl bg-slate-50 p-3">
                  <strong>1. Kata Sandi Kuat:</strong> Minimal 8–12 karakter gabungan huruf kapital,
                  huruf kecil, angka, dan simbol (hindari tanggal lahir atau{' '}
                  <code className="font-mono text-blue-700">123456</code>).
                </li>
                <li className="rounded-xl bg-slate-50 p-3">
                  <strong>2. Autentikasi Dua Faktor (2FA):</strong> Lapisan kunci kedua berupa kode
                  OTP atau aplikasi autentikator saat login di perangkat baru.
                </li>
                <li className="rounded-xl bg-slate-50 p-3">
                  <strong>3. Waspada Phishing:</strong> Penipuan berkedok tautan hadiah gratis yang
                  memancingmu memasukkan username dan password.
                </li>
                <li className="rounded-xl bg-slate-50 p-3">
                  <strong>4. Cegah Doxing:</strong> Jangan pernah menyebarkan alamat, nomor HP,
                  atau data pribadi orang lain tanpa izin di internet.
                </li>
              </ul>
            </div>

            <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <svg
                viewBox="0 0 260 190"
                className="w-full max-w-xs"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Diagram pertahanan benteng data"
              >
                <path
                  d="M130 16L205 42V95C205 138 173 166 130 180C87 166 55 138 55 95V42L130 16Z"
                  fill="#0F172A"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                />
                <text x="130" y="64" textAnchor="middle" fill="#BAE6FD" fontSize="11" fontWeight="bold">
                  BENTENG DATA
                </text>
                <rect x="85" y="76" width="90" height="24" rx="6" fill="#2563EB" />
                <text x="130" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  1. Sandi Kuat
                </text>
                <rect x="85" y="106" width="90" height="24" rx="6" fill="#10B981" />
                <text x="130" y="122" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  2. Aktifkan 2FA
                </text>
                <rect x="85" y="136" width="90" height="24" rx="6" fill="#F59E0B" />
                <text x="130" y="152" textAnchor="middle" fill="white" fontSize="10.5" fontWeight="bold">
                  3. Tolak Phishing
                </text>
              </svg>
            </div>
          </div>

          {/* Interactive Password Strength Mini-Lab */}
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white">
                Laboratorium Uji Kekuatan Kata Sandi (Lokal, Tidak Disimpan)
              </h4>
              <span className={`text-xs font-semibold ${pwAnalysis.textColor}`}>
                {pwAnalysis.label}
              </span>
            </div>
            <input
              type="text"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="Coba ketik misalnya: kucing123 lalu bandingkan dengan KuC1ng#Siber9!"
              className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400"
            />
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className={`h-full transition-all duration-300 ${pwAnalysis.barColor}`}
                style={{ width: `${pwAnalysis.score}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-300">{pwAnalysis.tip}</p>
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => handleSwitchTab(1)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              ← Kembali ke Sub-bab 1
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab(3)}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              Lanjut ke Sub-bab 3 →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: JEJAK DIGITAL */}
      {activeTab === 3 && (
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-xs font-semibold text-indigo-700">
                Sub-bab 3 · Rekam Aktivitas
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Jejak Digital (<em>Digital Footprint</em>)
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Bayangkan berjalan di atas semen basah: setiap langkah akan membekas permanen.
                Semua aktivitasmu di internet meninggalkan <strong>Jejak Digital</strong>.
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-slate-800">
                  <strong className="text-blue-900">✍️ Jejak Digital Aktif:</strong> Jejak yang
                  sengaja kamu tinggalkan. Contoh: mengunggah foto, menulis komentar, membuat
                  status, mengirim email.
                </div>
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 text-sm text-slate-800">
                  <strong className="text-indigo-900">📡 Jejak Digital Pasif:</strong> Jejak yang
                  terekam otomatis tanpa disadari. Contoh: riwayat pencarian browser,{' '}
                  <em>cookies</em> situs web, alamat IP, dan riwayat lokasi GPS.
                </div>
              </div>
            </div>

            <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <svg
                viewBox="0 0 260 190"
                className="w-full max-w-xs"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Ilustrasi jejak digital permanen"
              >
                <rect
                  x="15"
                  y="15"
                  width="230"
                  height="160"
                  rx="16"
                  fill="#FFFFFF"
                  stroke="#C7D2FE"
                  strokeWidth="2.5"
                />
                <text x="130" y="40" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#3730A3">
                  INTERNET TIDAK PERNAH LUPA
                </text>
                <ellipse cx="75" cy="84" rx="14" ry="22" transform="rotate(-15 75 84)" fill="#4F46E5" />
                <circle cx="65" cy="56" r="4" fill="#4F46E5" />
                <circle cx="74" cy="53" r="4" fill="#4F46E5" />
                <circle cx="83" cy="56" r="4" fill="#4F46E5" />
                <ellipse cx="132" cy="114" rx="14" ry="22" transform="rotate(12 132 114)" fill="#2563EB" />
                <circle cx="123" cy="86" r="4" fill="#2563EB" />
                <circle cx="133" cy="83" r="4" fill="#2563EB" />
                <circle cx="142" cy="87" r="4" fill="#2563EB" />
                <ellipse cx="188" cy="82" rx="14" ry="22" transform="rotate(-10 188 82)" fill="#0284C7" />
                <circle cx="179" cy="54" r="4" fill="#0284C7" />
                <circle cx="189" cy="51" r="4" fill="#0284C7" />
                <circle cx="198" cy="55" r="4" fill="#0284C7" />
                <text x="130" y="156" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">
                  Postingan hari ini = Reputasimu esok!
                </text>
              </svg>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <h4 className="text-sm font-bold text-emerald-900">
                ✅ Dampak Positif (Jejak Bersih)
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-emerald-900/90">
                Sering membagikan karya desain, prestasi lomba, atau komentar santun menjadi
                portofolio berharga saat mendaftar beasiswa, SMA favorit, atau melamar kerja.
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-4">
              <h4 className="text-sm font-bold text-red-900">
                ❌ Dampak Negatif (Jejak Buruk)
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-red-900/90">
                Komentar kasar (<em>cyberbullying</em>), menyebar hoaks, atau foto memalukan dapat
                tersimpan sebagai tangkapan layar (<em>screenshot</em>) orang lain meski sudah
                dihapus.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => handleSwitchTab(2)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              ← Kembali ke Sub-bab 2
            </button>
            <button
              type="button"
              onClick={onCompleteAndNext}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 whitespace-nowrap shrink-0"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Tandai Selesai &amp; Lanjut ke Video Interaktif</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
