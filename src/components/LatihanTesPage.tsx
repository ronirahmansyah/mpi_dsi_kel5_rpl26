import { useState, type DragEvent } from 'react';
import { CheckCircle2, ClipboardCheck, Home, RotateCcw, XCircle } from 'lucide-react';
import { DND_ITEMS, MC_QUESTIONS, TF_QUESTIONS } from '../data/learningData';
import type { DndItem } from '../types';

interface LatihanTesPageProps {
  username: string;
  onBackHome: () => void;
  onFinishTest: (score: number) => void;
  onIncompleteWarning: (title: string, message: string) => void;
  onPlaySound: (type: 'ok' | 'err' | 'click') => void;
}

type DndLocation = 'pool' | 'privat' | 'publik';

function createInitialDndState(): Record<string, DndLocation> {
  const map: Record<string, DndLocation> = {};
  for (const item of DND_ITEMS) {
    map[item.id] = 'pool';
  }
  return map;
}

export function LatihanTesPage({
  username,
  onBackHome,
  onFinishTest,
  onIncompleteWarning,
  onPlaySound,
}: LatihanTesPageProps) {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [mcAnswers, setMcAnswers] = useState<Record<number, number>>({});
  const [dndPlacements, setDndPlacements] = useState<Record<string, DndLocation>>(() =>
    createInitialDndState()
  );
  const [selectedTapCardId, setSelectedTapCardId] = useState<string | null>(null);
  const [dragOverZone, setDragOverZone] = useState<DndLocation | null>(null);
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const switchPart = (part: 1 | 2 | 3) => {
    onPlayClickSound();
    setActivePart(part);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onPlayClickSound = () => onPlaySound('click');

  // Drag and drop + Tap-to-place handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setSelectedTapCardId(id);
  };

  const handleDropToZone = (e: DragEvent<HTMLDivElement>, target: DndLocation) => {
    e.preventDefault();
    setDragOverZone(null);
    const id = e.dataTransfer.getData('text/plain') || selectedTapCardId;
    if (!id) return;
    onPlayClickSound();
    setDndPlacements((prev) => ({ ...prev, [id]: target }));
    setSelectedTapCardId(null);
  };

  const handleZoneTap = (target: DndLocation) => {
    if (!selectedTapCardId) return;
    onPlayClickSound();
    setDndPlacements((prev) => ({ ...prev, [selectedTapCardId]: target }));
    setSelectedTapCardId(null);
  };

  const handleCardTap = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onPlayClickSound();
    setSelectedTapCardId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = () => {
    const mcCount = Object.keys(mcAnswers).length;
    const dndPoolCount = DND_ITEMS.filter((item) => dndPlacements[item.id] === 'pool').length;
    const tfCount = Object.keys(tfAnswers).length;

    if (mcCount < MC_QUESTIONS.length) {
      onIncompleteWarning(
        'Bagian 1 Belum Lengkap',
        `Kamu baru menjawab ${mcCount} dari ${MC_QUESTIONS.length} soal Pilihan Ganda. Lengkapi dahulu sebelum mengumpulkan!`
      );
      setActivePart(1);
      return;
    }

    if (dndPoolCount > 0) {
      onIncompleteWarning(
        'Bagian 2 Belum Lengkap',
        `Masih ada ${dndPoolCount} item data yang belum dimasukkan ke kotak Informasi Privat atau Informasi Publik.`
      );
      setActivePart(2);
      return;
    }

    if (tfCount < TF_QUESTIONS.length) {
      onIncompleteWarning(
        'Bagian 3 Belum Lengkap',
        `Kamu baru menjawab ${tfCount} dari ${TF_QUESTIONS.length} pernyataan Benar/Salah.`
      );
      setActivePart(3);
      return;
    }

    onPlaySound('ok');
    setIsSubmitted(true);
    const results = calculateResults();
    onFinishTest(results.totalScore);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateResults = () => {
    let p1Correct = 0;
    for (const q of MC_QUESTIONS) {
      if (mcAnswers[q.id] === q.correctIndex) p1Correct += 1;
    }

    let p2Correct = 0;
    for (const item of DND_ITEMS) {
      if (dndPlacements[item.id] === item.correctZone) p2Correct += 1;
    }

    let p3Correct = 0;
    for (const q of TF_QUESTIONS) {
      if (tfAnswers[q.id] === q.correctAnswer) p3Correct += 1;
    }

    const totalCorrect = p1Correct + p2Correct + p3Correct;
    const totalScore = Math.round((totalCorrect / 15) * 100);
    return { p1Correct, p2Correct, p3Correct, totalCorrect, totalScore };
  };

  const handleRetry = () => {
    onPlayClickSound();
    setMcAnswers({});
    setDndPlacements(createInitialDndState());
    setSelectedTapCardId(null);
    setTfAnswers({});
    setIsSubmitted(false);
    setActivePart(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const poolItems = DND_ITEMS.filter((i) => dndPlacements[i.id] === 'pool');
  const privatItems = DND_ITEMS.filter((i) => dndPlacements[i.id] === 'privat');
  const publikItems = DND_ITEMS.filter((i) => dndPlacements[i.id] === 'publik');

  const results = calculateResults();
  const predicate =
    results.totalScore >= 90
      ? 'Sangat Baik · Warga Digital Teladan'
      : results.totalScore >= 75
        ? 'Baik · Sudah Memenuhi Target'
        : results.totalScore >= 60
          ? 'Cukup · Terus Berlatih'
          : 'Perlu Mengulang Materi';

  const renderDndCard = (item: DndItem) => {
    const isSelected = selectedTapCardId === item.id;
    return (
      <div
        key={item.id}
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
        onClick={(e) => handleCardTap(e, item.id)}
        className={`cursor-grab rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors select-none ${
          isSelected
            ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-600/20'
            : 'border-slate-200 bg-white text-slate-800 hover:border-blue-500'
        }`}
      >
        <span className="mr-2 font-mono text-xs font-bold text-slate-400">#{item.number}</span>
        {item.text}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Latihan Soal / Tes Evaluasi (15 Soal)
            </h2>
            <p className="text-sm text-slate-600">
              Berbasis Stimulus Kontekstual TKA SMP · Perkaban BSKAP No. 47/H/AN/2025
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

      {!isSubmitted ? (
        <div className="space-y-6">
          {/* 3-Part Stepper */}
          <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-2 md:grid-cols-3">
            <button
              type="button"
              onClick={() => switchPart(1)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePart === 1
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Bagian 1: Pilihan Ganda (1–5)
            </button>
            <button
              type="button"
              onClick={() => switchPart(2)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePart === 2
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Bagian 2: Drag &amp; Drop (6–10)
            </button>
            <button
              type="button"
              onClick={() => switchPart(3)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePart === 3
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Bagian 3: Benar / Salah (11–15)
            </button>
          </div>

          {/* PART 1: MULTIPLE CHOICE */}
          {activePart === 1 && (
            <div className="space-y-5">
              {MC_QUESTIONS.map((q) => (
                <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div
                    className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-700"
                    dangerouslySetInnerHTML={{ __html: q.stimulus }}
                  />
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {q.id}. {q.question}
                  </h3>
                  <div className="mt-3.5 space-y-2.5">
                    {q.options.map((opt, idx) => {
                      const isSelected = mcAnswers[q.id] === idx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            onPlayClickSound();
                            setMcAnswers((prev) => ({ ...prev, [q.id]: idx }));
                          }}
                          className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 font-semibold text-blue-950'
                              : 'border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => switchPart(2)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Lanjut ke Bagian 2 (Drag &amp; Drop) →
                </button>
              </div>
            </div>
          )}

          {/* PART 2: DRAG AND DROP (5 ITEMS) */}
          {activePart === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold text-indigo-700">
                  Bagian 2 · Soal 6 s.d. 10 (Kategorisasi Data)
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  Pilih Kategori: Informasi Privat vs. Informasi Publik
                </h3>
                <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-700">
                  <strong>Wacana Stimulus TKA:</strong> Nisa (siswi kelas 7) sedang merapikan profil
                  akun media sosial baru sekaligus mengisi formulir lomba poster digital tingkat
                  SMP. Ia memiliki 5 potongan data berikut. Bantu Nisa memilah ke dalam kotak
                  kategori yang tepat.
                  <br />
                  <span className="mt-1.5 block text-xs font-medium text-blue-800">
                    Cara bermain: Seret (<em>drag</em>) kartu ke kotak tujuan, atau{' '}
                    <strong>klik kartu lalu klik kotak tujuan</strong> (ramah layar sentuh).
                  </span>
                </div>

                {/* Unsorted Pool */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-slate-500">
                    Daftar Item Data (Belum Dikelompokkan · {poolItems.length} tersisa)
                  </p>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverZone('pool');
                    }}
                    onDragLeave={() => setDragOverZone(null)}
                    onDrop={(e) => handleDropToZone(e, 'pool')}
                    onClick={() => handleZoneTap('pool')}
                    className={`mt-2 flex min-h-20 flex-wrap gap-2.5 rounded-2xl border-2 border-dashed p-4 transition-colors ${
                      dragOverZone === 'pool'
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {poolItems.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">
                        Semua kartu sudah dikelompokkan. Klik kartu di kotak bawah jika ingin
                        memindahkannya lagi.
                      </span>
                    ) : (
                      poolItems.map(renderDndCard)
                    )}
                  </div>
                </div>

                {/* Target Zones */}
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverZone('privat');
                    }}
                    onDragLeave={() => setDragOverZone(null)}
                    onDrop={(e) => handleDropToZone(e, 'privat')}
                    onClick={() => handleZoneTap('privat')}
                    className={`min-h-44 rounded-2xl border-2 border-dashed p-4 transition-colors ${
                      dragOverZone === 'privat'
                        ? 'border-amber-600 bg-amber-100/70'
                        : 'border-amber-300 bg-amber-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-amber-950">
                        🔒 Informasi Privat (Wajib Dilindungi)
                      </strong>
                      <span className="text-xs font-bold text-amber-800 tabular-nums">
                        {privatItems.length} item
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-amber-800/80">
                      Klik di sini untuk menaruh kartu terpilih
                    </p>
                    <div className="mt-3 space-y-2">{privatItems.map(renderDndCard)}</div>
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverZone('publik');
                    }}
                    onDragLeave={() => setDragOverZone(null)}
                    onDrop={(e) => handleDropToZone(e, 'publik')}
                    onClick={() => handleZoneTap('publik')}
                    className={`min-h-44 rounded-2xl border-2 border-dashed p-4 transition-colors ${
                      dragOverZone === 'publik'
                        ? 'border-emerald-600 bg-emerald-100/70'
                        : 'border-emerald-300 bg-emerald-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-emerald-950">
                        🌐 Informasi Publik (Aman Dibagikan)
                      </strong>
                      <span className="text-xs font-bold text-emerald-800 tabular-nums">
                        {publikItems.length} item
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-emerald-800/80">
                      Klik di sini untuk menaruh kartu terpilih
                    </p>
                    <div className="mt-3 space-y-2">{publikItems.map(renderDndCard)}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => switchPart(1)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  ← Kembali ke Bagian 1
                </button>
                <button
                  type="button"
                  onClick={() => switchPart(3)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Lanjut ke Bagian 3 (Benar / Salah) →
                </button>
              </div>
            </div>
          )}

          {/* PART 3: TRUE / FALSE */}
          {activePart === 3 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold text-emerald-700">
                  Bagian 3 · Soal 11 s.d. 15 (Benar / Salah)
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  Analisis Kasus Keamanan Siber &amp; Jejak Digital
                </h3>

                <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-700">
                  <strong>Wacana Stimulus TKA:</strong> Bacalah kasus berikut:{' '}
                  <em>
                    &ldquo;Bima sering menggunakan Wi-Fi gratis tanpa kata sandi di taman kota untuk
                    login ke akun game dan aplikasi dompet digitalnya. Ia memakai password yang sama
                    untuk semua akun, yaitu{' '}
                    <code className="font-mono text-blue-700">bima12052013</code> (nama dan tanggal
                    lahirnya). Suatu hari, Bima menerima chat dari akun tak dikenal yang memintanya
                    mengklik tautan hadiah sepatu gratis dengan syarat memasukkan kode OTP yang
                    masuk ke SMS.&rdquo;
                  </em>
                </div>

                <div className="mt-5 space-y-3">
                  {TF_QUESTIONS.map((q) => {
                    const ans = tfAnswers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                      >
                        <p className="text-sm leading-relaxed text-slate-800">
                          <strong className="mr-1.5 text-slate-900">{q.id}.</strong>
                          {q.statement}
                        </p>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onPlayClickSound();
                              setTfAnswers((prev) => ({ ...prev, [q.id]: true }));
                            }}
                            className={`rounded-xl border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                              ans === true
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            Benar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onPlayClickSound();
                              setTfAnswers((prev) => ({ ...prev, [q.id]: false }));
                            }}
                            className={`rounded-xl border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                              ans === false
                                ? 'border-red-600 bg-red-600 text-white'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            Salah
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => switchPart(2)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  ← Kembali ke Bagian 2
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Kumpulkan &amp; Lihat Nilai</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* SCORE SUMMARY & DETAILED REVIEW */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-xs font-semibold text-blue-700">
              Hasil Tes Evaluasi Informatika · {username}
            </p>
            <div className="mt-3 text-5xl font-extrabold text-slate-900 tabular-nums">
              {results.totalScore}
              <span className="text-xl font-semibold text-slate-400"> / 100</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-emerald-700">{predicate}</p>

            <div className="mt-6 grid gap-4 text-left sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs text-slate-500">Bagian 1 · Pilihan Ganda</div>
                <div className="mt-1 text-lg font-bold text-slate-900 tabular-nums">
                  {results.p1Correct} / {MC_QUESTIONS.length} Benar
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs text-slate-500">Bagian 2 · Drag &amp; Drop</div>
                <div className="mt-1 text-lg font-bold text-slate-900 tabular-nums">
                  {results.p2Correct} / {DND_ITEMS.length} Benar
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs text-slate-500">Bagian 3 · Benar / Salah</div>
                <div className="mt-1 text-lg font-bold text-slate-900 tabular-nums">
                  {results.p3Correct} / {TF_QUESTIONS.length} Benar
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Ulangi Latihan</span>
              </button>
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                <span>Kembali ke Menu Utama</span>
              </button>
            </div>
          </div>

          {/* 15-Item Review List */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Pembahasan Singkat Tiap Nomor (1–15)
            </h3>

            <div className="mt-4 space-y-3">
              {MC_QUESTIONS.map((q) => {
                const chosen = mcAnswers[q.id];
                const ok = chosen === q.correctIndex;
                return (
                  <div
                    key={`mc-${q.id}`}
                    className={`rounded-xl border p-4 text-sm ${
                      ok ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      {ok ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                      )}
                      <span>
                        No. {q.id} (Pilihan Ganda) · {ok ? 'Benar' : 'Belum Tepat'}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-700">{q.question}</p>
                    <p className="mt-1.5 text-xs text-slate-600">
                      <strong>Jawaban Benar:</strong> {q.options[q.correctIndex]} — {q.explanation}
                    </p>
                  </div>
                );
              })}

              {DND_ITEMS.map((item) => {
                const chosen = dndPlacements[item.id];
                const ok = chosen === item.correctZone;
                return (
                  <div
                    key={`dnd-${item.id}`}
                    className={`rounded-xl border p-4 text-sm ${
                      ok ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      {ok ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                      )}
                      <span>
                        No. {item.number} (Drag &amp; Drop) · {ok ? 'Benar' : 'Belum Tepat'}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-700">{item.text}</p>
                    <p className="mt-1.5 text-xs text-slate-600">
                      <strong>Kategori Tepat:</strong>{' '}
                      {item.correctZone === 'privat' ? 'Informasi Privat 🔒' : 'Informasi Publik 🌐'}{' '}
                      — {item.explanation}
                    </p>
                  </div>
                );
              })}

              {TF_QUESTIONS.map((q) => {
                const chosen = tfAnswers[q.id];
                const ok = chosen === q.correctAnswer;
                return (
                  <div
                    key={`tf-${q.id}`}
                    className={`rounded-xl border p-4 text-sm ${
                      ok ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      {ok ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                      )}
                      <span>
                        No. {q.id} (Benar / Salah) · {ok ? 'Benar' : 'Belum Tepat'}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-700">{q.statement}</p>
                    <p className="mt-1.5 text-xs text-slate-600">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
