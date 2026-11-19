import { FileText, Home } from 'lucide-react';

interface CpTpPageProps {
  onBackHome: () => void;
}

export function CpTpPage({ onBackHome }: CpTpPageProps) {
  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Capaian &amp; Tujuan Pembelajaran (CP - TP)
            </h2>
            <p className="text-sm text-slate-600">
              Landasan Kurikulum Nasional Informatika Fase D (SMP Kelas 7)
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

      {/* Capaian Pembelajaran */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold text-blue-700">
          Kepka BSKAP Kemendikdasmen No. 46/H/KR/2025
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-slate-900">
          Capaian Pembelajaran (CP) Informatika Fase D — Elemen Literasi Digital
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Pada akhir Fase D (SMP/MTs Kelas VII–IX), peserta didik mampu memahami cara kerja dan
          penggunaan mesin pencari, memilah kredibilitas informasi, mengetahui jenis ruang publik
          virtual, memanfaatkan perangkat teknologi digital untuk produksi dan diseminasi konten
          secara etis, <strong>memahami pentingnya menjaga rekam jejak digital</strong>, mengamalkan
          toleransi dan empati di dunia digital, memahami dampak perundungan digital,{' '}
          <strong>membuat kata sandi yang aman</strong>, memahami pengamanan perangkat dari malware,{' '}
          <strong>
            memilah informasi yang bersifat privat dan publik, melindungi data pribadi dan identitas
            digital
          </strong>
          , serta memiliki kesadaran penuh (<em>mindfulness</em>) dalam dunia digital.
        </p>
      </section>

      {/* Tujuan Pembelajaran */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-900">Tujuan Pembelajaran (TP) Khusus Kelas 7</h3>
        <p className="mt-1 text-sm text-slate-600">
          Setelah mempelajari aplikasi ini, peserta didik diharapkan mampu:
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-blue-700">TP 1 · Klasifikasi Data</div>
            <p className="mt-1 text-sm text-slate-800">
              <strong>Memilah Informasi Privat dan Publik:</strong> Membedakan jenis informasi yang
              bersifat privat (rahasia) dan informasi yang boleh dibagikan di ruang publik virtual
              secara tepat.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-emerald-700">TP 2 · Proteksi Akun</div>
            <p className="mt-1 text-sm text-slate-800">
              <strong>Melindungi Data Pribadi &amp; Keamanan Akun:</strong> Menerapkan pembuatan
              kata sandi yang kuat, autentikasi dua faktor (2FA), serta mengenali ancaman penipuan
              siber seperti <em>phishing</em> dan <em>doxing</em>.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-indigo-700">TP 3 · Evaluasi Rekam Jejak</div>
            <p className="mt-1 text-sm text-slate-800">
              <strong>Menganalisis Jejak Digital:</strong> Membedakan jejak digital aktif dan pasif
              serta mengevaluasi dampak jangka panjang jejak digital terhadap reputasi diri di masa
              depan.
            </p>
          </div>
        </div>
      </section>

      {/* Kerangka Asesmen TKA */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold text-indigo-700">
          Perkaban BSKAP No. 47/H/AN/2025
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-slate-900">
          Acuan Kerangka Asesmen Tes Kemampuan Akademik (TKA) Jenjang SD &amp; SMP Sederajat
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-bold text-slate-900">01. Stimulus Kontekstual</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Setiap soal diawali wacana atau studi kasus kehidupan digital remaja SMP sehari-hari.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-bold text-slate-900">02. Ragam Bentuk Soal</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Menggunakan Pilihan Ganda Sederhana, Kategorisasi (Drag &amp; Drop), serta
              Benar/Salah.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-bold text-slate-900">03. Level Kognitif Penalaran</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Menguji pemahaman konsep, analisis risiko siber, dan pengambilan keputusan aman.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
