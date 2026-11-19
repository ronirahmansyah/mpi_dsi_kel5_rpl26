import { HelpCircle, Home } from 'lucide-react';

interface PetunjukPageProps {
  onBackHome: () => void;
}

const GUIDE_STEPS = [
  {
    num: '01',
    title: 'Kenali Menu & Status Progres',
    body: 'Di Menu Utama tersedia 7 menu pembelajaran. Setiap menu mencatat status penyelesaianmu secara otomatis pada bar progres di bagian atas.',
  },
  {
    num: '02',
    title: 'Pelajari CP-TP & Materi',
    body: 'Buka menu CP - TP untuk melihat target kurikulum, lalu pelajari 3 sub-bab Materi serta coba laboratorium uji kekuatan kata sandi.',
  },
  {
    num: '03',
    title: 'Tonton Video Interaktif',
    body: 'Putar animasi cerita Raka. Saat tayangan menyentuh titik kuning (checkpoint), jawab pertanyaan pop-up untuk melanjutkan cerita.',
  },
  {
    num: '04',
    title: 'Mainkan Game Detektif Siber',
    body: 'Kamu memiliki 3 Nyawa. Baca 6 kasus siber dengan cermat dan pilih langkah paling aman untuk meraih skor tinggi.',
  },
  {
    num: '05',
    title: 'Bereksperimen di Simulasi',
    body: 'Pada menu Simulasi, ubah status item data antara Privat dan Publik untuk melihat perubahan skor keamanan serta profil publikmu.',
  },
  {
    num: '06',
    title: 'Kerjakan Latihan Soal (15 Soal)',
    body: 'Terdiri atas Pilihan Ganda (1–5), Drag & Drop / Ketuk (6–10), dan Benar/Salah (11–15). Selesaikan seluruh bagian untuk melihat nilai dan pembahasan.',
  },
];

export function PetunjukPage({ onBackHome }: PetunjukPageProps) {
  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Petunjuk Penggunaan Aplikasi</h2>
            <p className="text-sm text-slate-600">
              Panduan singkat agar aktivitas belajarmu lancar, terarah, dan menyenangkan.
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

      {/* 6 Steps Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GUIDE_STEPS.map((step) => (
          <div key={step.num} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-xs font-bold tracking-wide text-blue-600 tabular-nums">
              Langkah {step.num}
            </div>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
          </div>
        ))}
      </div>

      {/* Key Concepts Legend */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-bold text-slate-900">Istilah &amp; Simbol Penting</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm">
            <div className="font-semibold text-slate-900">🔒 Data Privat</div>
            <p className="mt-1 text-xs text-slate-600">Data rahasia yang wajib dilindungi.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm">
            <div className="font-semibold text-slate-900">🌐 Informasi Publik</div>
            <p className="mt-1 text-xs text-slate-600">Informasi umum/karya yang aman dibagikan.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm">
            <div className="font-semibold text-slate-900">🛡️ Keamanan Siber</div>
            <p className="mt-1 text-xs text-slate-600">Perlindungan akun via sandi kuat &amp; 2FA.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm">
            <div className="font-semibold text-slate-900">👣 Jejak Digital</div>
            <p className="mt-1 text-xs text-slate-600">Rekam aktivitas aktif &amp; pasif di internet.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm">
            <div className="font-semibold text-slate-900">⚠️ Phishing &amp; Doxing</div>
            <p className="mt-1 text-xs text-slate-600">Penipuan tautan &amp; penyebaran data tanpa izin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
