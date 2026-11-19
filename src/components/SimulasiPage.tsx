import { useState } from 'react';
import { FlaskConical, Globe, Home, Lock, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react';
import { SIM_DATA_ITEMS } from '../data/learningData';

interface SimulasiPageProps {
  username: string;
  onBackHome: () => void;
  onPlayClick: () => void;
}

type VisibilityChoice = 'privat' | 'publik';

function createSafeInitialChoices(): Record<string, VisibilityChoice> {
  const initial: Record<string, VisibilityChoice> = {};
  for (const item of SIM_DATA_ITEMS) {
    initial[item.id] = 'privat';
  }
  return initial;
}

export function SimulasiPage({ username, onBackHome, onPlayClick }: SimulasiPageProps) {
  const [choices, setChoices] = useState<Record<string, VisibilityChoice>>(() =>
    createSafeInitialChoices()
  );

  const setChoice = (id: string, val: VisibilityChoice) => {
    onPlayClick();
    setChoices((prev) => ({ ...prev, [id]: val }));
  };

  const resetAll = () => {
    onPlayClick();
    setChoices(createSafeInitialChoices());
  };

  // Compute live security score (100 minus sum of riskWeight for private items exposed publicly)
  let totalRisk = 0;
  let positiveScore = 0;
  const exposedDangerItems: typeof SIM_DATA_ITEMS = [];
  const publicItems: typeof SIM_DATA_ITEMS = [];

  for (const item of SIM_DATA_ITEMS) {
    const mode = choices[item.id] || 'privat';
    if (mode === 'publik') {
      publicItems.push(item);
      if (item.recommended === 'privat') {
        totalRisk += item.riskWeight;
        exposedDangerItems.push(item);
      } else {
        positiveScore += item.positiveWeight;
      }
    }
  }

  const securityScore = Math.max(0, 100 - totalRisk);
  const securityStatus =
    securityScore >= 85
      ? { label: 'Sangat Aman', color: 'text-emerald-700', bar: 'bg-emerald-500' }
      : securityScore >= 55
        ? { label: 'Waspada Risiko', color: 'text-amber-700', bar: 'bg-amber-500' }
        : { label: 'Bahaya Privasi Bocor', color: 'text-red-700', bar: 'bg-red-500' };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Simulasi: Jejak Digital &amp; Keamanan Data
            </h2>
            <p className="text-sm text-slate-600">
              Atur data mana yang disimpan Privat dan mana yang di-Posting ke Publik, lalu amati
              dampaknya secara langsung.
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

      {/* Two-Zone Sandbox */}
      <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Left Zone: Interactive Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pengaturan Data &amp; Postingan
              </h3>
              <p className="text-xs text-slate-600">
                Pilih mode Privat 🔒 atau Publik 🌐 pada tiap potongan informasi.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Aman</span>
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {SIM_DATA_ITEMS.map((item) => {
              const mode = choices[item.id] || 'privat';
              const isDanger = mode === 'publik' && item.recommended === 'privat';
              const isGoodPublic = mode === 'publik' && item.recommended === 'publik';

              let rowStyle = 'border-slate-200 bg-white';
              if (isDanger) rowStyle = 'border-red-300 bg-red-50/70';
              else if (isGoodPublic) rowStyle = 'border-blue-300 bg-blue-50/60';

              return (
                <div
                  key={item.id}
                  className={`flex flex-col justify-between gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center ${rowStyle}`}
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                    <p className="mt-0.5 text-xs text-slate-600">{item.detail}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-xl bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setChoice(item.id, 'privat')}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        mode === 'privat'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>Privat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setChoice(item.id, 'publik')}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        mode === 'publik'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Publik</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Zone: Real-Time Monitor */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-bold text-slate-900">
            Monitor Keamanan &amp; Jejak Digital (Real-Time)
          </h3>

          {/* Security Account Meter */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-semibold text-slate-900">Indikator Keamanan Akun</span>
              <span className={`font-bold tabular-nums ${securityStatus.color}`}>
                {securityScore}% · {securityStatus.label}
              </span>
            </div>
            <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full transition-all duration-300 ${securityStatus.bar}`}
                style={{ width: `${securityScore}%` }}
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-600 tabular-nums">
              Skor Citra Positif: <strong className="text-slate-900">{positiveScore} poin</strong>{' '}
              (Bagikan karya atau hobi untuk membangun jejak digital positif)
            </p>
          </div>

          {/* Live Public Social Profile Preview */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="h-14 bg-slate-900" />
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Profil Publik {username}</div>
                  <div className="text-xs text-slate-500">
                    Pratinjau data yang terlihat oleh semua orang di internet
                  </div>
                </div>
              </div>

              <div className="mt-3.5 border-t border-slate-100 pt-3">
                {publicItems.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    Belum ada informasi yang dipublikasikan. Semua data masih tersimpan privat.
                  </p>
                ) : (
                  <ul className="space-y-1.5 text-xs">
                    {publicItems.map((item) => {
                      const risky = item.recommended === 'privat';
                      return (
                        <li
                          key={item.id}
                          className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 ${
                            risky
                              ? 'bg-red-50 text-red-900 font-semibold'
                              : 'bg-emerald-50 text-emerald-900'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className="shrink-0">
                            {risky ? '⚠️ Rentan' : '✓ Aman'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Real-Time Impact Analysis */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              {exposedDangerItems.length > 0 ? (
                <ShieldAlert className="h-4 w-4 text-red-600" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              )}
              <span>Analisis Dampak Saat Ini</span>
            </div>

            <div className="mt-3 space-y-2 text-xs leading-relaxed">
              {exposedDangerItems.length === 0 ? (
                <p className="text-emerald-800">
                  Tidak ada data sensitif yang bocor ke publik. Pertahankan perlindungan data
                  pribadimu!
                </p>
              ) : (
                exposedDangerItems.map((item) => (
                  <div key={item.id} className="rounded-lg bg-red-100/70 p-2.5 text-red-950">
                    <strong>{item.label}:</strong> {item.publicImpact}
                  </div>
                ))
              )}

              {positiveScore > 0 && (
                <div className="rounded-lg bg-emerald-100/70 p-2.5 text-emerald-950">
                  Bagus! Kamu membagikan informasi positif yang aman sehingga membangun portofolio
                  jejak digital sehat (+{positiveScore} poin).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
