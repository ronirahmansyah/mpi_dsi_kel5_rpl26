import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Gamepad2,
  HelpCircle,
  PlayCircle,
} from 'lucide-react';
import type { ModuleCompletion, PageId } from '../types';

interface DashboardPageProps {
  username: string;
  completed: ModuleCompletion;
  bestGameScore: number;
  bestTestScore: number | null;
  onNavigate: (page: PageId) => void;
}

const MODULES: {
  id: Exclude<PageId, 'dashboard'>;
  number: string;
  title: string;
  description: string;
  accentBg: string;
  accentText: string;
  icon: typeof HelpCircle;
}[] = [
  {
    id: 'petunjuk',
    number: 'Menu 01',
    title: 'Petunjuk',
    description: 'Panduan penggunaan tombol, arti ikon, alur simulasi, dan aturan latihan soal.',
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-700',
    icon: HelpCircle,
  },
  {
    id: 'cptp',
    number: 'Menu 02',
    title: 'CP - TP',
    description: 'Capaian dan Tujuan Pembelajaran sesuai Kepka BSKAP 46/2025 & TKA 47/2025.',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-700',
    icon: FileText,
  },
  {
    id: 'materi',
    number: 'Menu 03',
    title: 'Materi',
    description: 'Informasi Privat vs. Publik, Keamanan Data, Jejak Digital, dan Uji Kata Sandi.',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-700',
    icon: BookOpen,
  },
  {
    id: 'video',
    number: 'Menu 04',
    title: 'Video Interaktif: Informasi Privat & Publik',
    description: 'Animasi cerita Raka & Kartu Pelajar lengkap dengan 3 kuis checkpoint interaktif.',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-700',
    icon: PlayCircle,
  },
  {
    id: 'games',
    number: 'Menu 05',
    title: 'Games Seru: Detektif Siber',
    description: 'Uji ketangkasanmu pada 6 kasus siber nyata dengan sistem nyawa, skor, dan umpan balik.',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-700',
    icon: Gamepad2,
  },
  {
    id: 'simulasi',
    number: 'Menu 06',
    title: 'Simulasi: Jejak Digital & Keamanan',
    description: 'Atur privasi profil media sosial secara langsung dan amati dampak risikonya.',
    accentBg: 'bg-cyan-50',
    accentText: 'text-cyan-700',
    icon: FlaskConical,
  },
  {
    id: 'tes',
    number: 'Menu 07',
    title: 'Latihan Soal (Tes Evaluasi)',
    description: '15 Soal TKA SMP (Pilihan Ganda, Drag & Drop, Benar/Salah) beserta pembahasan.',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    icon: ClipboardCheck,
  },
];

export function DashboardPage({
  username,
  completed,
  bestGameScore,
  bestTestScore,
  onNavigate,
}: DashboardPageProps) {
  const doneCount = Object.values(completed).filter(Boolean).length;
  const percentage = Math.round((doneCount / 7) * 100);

  const rankLabel =
    doneCount >= 7
      ? 'Master Literasi Digital'
      : doneCount >= 4
        ? 'Detektif Siber'
        : doneCount >= 2
          ? 'Penjaga Privasi'
          : 'Taruna Siber';

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Progress Summary */}
      <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p className="text-xs font-medium text-sky-300">
              Misi Warga Digital Cerdas · Predikat: {rankLabel}
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
              Selamat Datang, {username}! Mari Jadi Warga Digital yang Cerdas!
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-300">
              Pilih aktivitas belajar di bawah ini secara berurutan agar pemahamanmu tentang
              privasi data dan jejak digital semakin kuat sebelum mengerjakan Tes Evaluasi.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/80 p-5">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-200">Progres Belajarmu</span>
              <span className="tabular-nums text-sky-300">{percentage}%</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-300 tabular-nums">
              {doneCount} dari 7 aktivitas telah diselesaikan
            </p>
          </div>
        </div>
      </section>

      {/* 7 Learning Menu Cards */}
      <section aria-label="Daftar menu pembelajaran">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isDone = completed[mod.id];

            let statusText = 'Belum dibuka';
            let statusClass = 'text-slate-500';
            if (mod.id === 'tes' && bestTestScore !== null) {
              statusText = `Nilai Terbaik: ${bestTestScore}`;
              statusClass = 'text-emerald-700 font-semibold';
            } else if (mod.id === 'games' && bestGameScore > 0) {
              statusText = `Skor Terbaik: ${bestGameScore}`;
              statusClass = 'text-amber-700 font-semibold';
            } else if (isDone) {
              statusText = 'Selesai';
              statusClass = 'text-emerald-700 font-semibold';
            }

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onNavigate(mod.id)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${mod.accentBg} ${mod.accentText}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-400">{mod.number}</span>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <span className={`inline-flex items-center gap-1 tabular-nums ${statusClass}`}>
                        {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {statusText}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                    {mod.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{mod.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-sm font-semibold text-blue-600">
                  <span>Buka Aktivitas</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
