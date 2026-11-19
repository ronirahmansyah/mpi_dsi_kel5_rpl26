import { useState } from 'react';
import { Gamepad2, Heart, Home, RotateCcw, Trophy } from 'lucide-react';
import { GAME_MISSIONS } from '../data/learningData';

interface GamesSeruPageProps {
  onBackHome: () => void;
  onGameFinish: (score: number) => void;
  onPlaySound: (type: 'ok' | 'err' | 'click') => void;
}

export function GamesSeruPage({
  onBackHome,
  onGameFinish,
  onPlaySound,
}: GamesSeruPageProps) {
  const [missionIdx, setMissionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const mission = GAME_MISSIONS[missionIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);

    const chosen = mission.options[idx];
    if (chosen.isCorrect) {
      onPlaySound('ok');
      setScore((prev) => prev + 20);
    } else {
      onPlaySound('err');
      setHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    onPlaySound('click');
    if (hearts <= 0 || missionIdx + 1 >= GAME_MISSIONS.length) {
      setIsFinished(true);
      onGameFinish(score);
      return;
    }
    setMissionIdx((prev) => prev + 1);
    setSelectedIdx(null);
  };

  const handleRestart = () => {
    onPlaySound('click');
    setMissionIdx(0);
    setScore(0);
    setHearts(3);
    setSelectedIdx(null);
    setIsFinished(false);
  };

  const maxScore = GAME_MISSIONS.length * 20;
  const starCount = score >= 100 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Games Seru: Misi Detektif Siber</h2>
            <p className="text-sm text-slate-600">
              Hadapi 6 situasi nyata di internet dan lindungi privasimu dengan pilihan yang aman.
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

      {!isFinished ? (
        <div className="space-y-5">
          {/* HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 px-6 py-4 text-white">
            <div className="flex items-center gap-4 text-sm font-semibold tabular-nums">
              <span className="text-sky-300">
                Misi {missionIdx + 1} / {GAME_MISSIONS.length}
              </span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>
                Skor: <strong className="text-amber-300">{score}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5" aria-label={`Sisa nyawa ${hearts} dari 3`}>
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 ${
                    i < hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Scenario Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                {mission.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700">{mission.category}</p>
                <h3 className="text-lg font-bold text-slate-900">{mission.title}</h3>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {mission.scenario}
            </div>

            <div className="mt-5 space-y-3">
              {mission.options.map((opt, idx) => {
                let style =
                  'border-slate-200 bg-white text-slate-800 hover:border-blue-500 hover:bg-slate-50';
                if (selectedIdx !== null) {
                  if (opt.isCorrect) {
                    style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (idx === selectedIdx) {
                    style = 'border-red-400 bg-red-50 text-red-900';
                  } else {
                    style = 'border-slate-200 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={selectedIdx !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${style}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedIdx !== null && (
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  mission.options[selectedIdx].isCorrect
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    : 'border-red-200 bg-red-50 text-red-950'
                }`}
              >
                <p className="text-sm font-bold">
                  {mission.options[selectedIdx].isCorrect
                    ? '✅ Tepat! (+20 poin)'
                    : '❌ Kurang Tepat (-1 nyawa)'}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {mission.options[selectedIdx].isCorrect
                    ? mission.feedbackOk
                    : mission.feedbackErr}
                </p>
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {hearts <= 0 || missionIdx + 1 >= GAME_MISSIONS.length
                    ? 'Lihat Hasil Akhir →'
                    : 'Lanjut Misi Berikutnya →'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Trophy className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {hearts > 0 ? 'Misi Detektif Siber Selesai!' : 'Nyawa Habis — Ayo Coba Lagi!'}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
            {hearts > 0
              ? 'Kamu berhasil menyelesaikan misi literasi digital dengan sikap waspada terhadap risiko privasi.'
              : 'Jangan menyerah! Pelajari kembali tanda-tanda phishing dan aturan data privat lalu mainkan lagi.'}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold tabular-nums">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900">
              Skor Akhir: <strong className="text-blue-700">{score}</strong> / {maxScore}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-amber-700">
              {'⭐'.repeat(starCount) || '☆'} ({starCount} dari 3 Bintang)
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Mainkan Ulang</span>
            </button>
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              <Home className="h-4 w-4" />
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
