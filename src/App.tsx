import { useState } from 'react';
import { LogOut, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { CpTpPage } from './components/CpTpPage';
import { CustomModal } from './components/CustomModal';
import { DashboardPage } from './components/DashboardPage';
import { GamesSeruPage } from './components/GamesSeruPage';
import { LatihanTesPage } from './components/LatihanTesPage';
import { LoginPage } from './components/LoginPage';
import { MateriPage } from './components/MateriPage';
import { PetunjukPage } from './components/PetunjukPage';
import { SimulasiPage } from './components/SimulasiPage';
import { VideoInteraktifPage } from './components/VideoInteraktifPage';
import type { ModalConfig, ModuleCompletion, PageId } from './types';
import { playSoundEffect } from './utils/sound';

const INITIAL_COMPLETION: ModuleCompletion = {
  petunjuk: false,
  cptp: false,
  materi: false,
  video: false,
  games: false,
  simulasi: false,
  tes: false,
};

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completed, setCompleted] = useState<ModuleCompletion>(INITIAL_COMPLETION);
  const [bestGameScore, setBestGameScore] = useState(0);
  const [bestTestScore, setBestTestScore] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalConfig>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const playSound = (type: 'ok' | 'err' | 'click') => {
    playSoundEffect(type, soundEnabled);
  };

  const openModal = (config: Omit<ModalConfig, 'isOpen'>) => {
    setModal({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogin = (studentName: string) => {
    playSound('ok');
    setUsername(studentName);
    setCurrentPage('dashboard');
  };

  const navigateTo = (page: PageId) => {
    playSound('click');
    setCurrentPage(page);
    if (page === 'petunjuk' || page === 'cptp' || page === 'simulasi') {
      setCompleted((prev) => ({ ...prev, [page]: true }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmLogout = () => {
    openModal({
      title: 'Keluar dari Aplikasi?',
      message: 'Apakah kamu yakin ingin keluar dan kembali ke halaman Login Siswa?',
      type: 'warning',
      confirmText: 'Ya, Keluar',
      cancelText: 'Batal',
      onConfirm: () => {
        setUsername(null);
        setCurrentPage('dashboard');
      },
    });
  };

  if (!username) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onPlayClick={() => playSound('click')}
          onValidationError={(title, message) => {
            playSound('err');
            openModal({ title, message, type: 'warning', confirmText: 'Mengerti' });
          }}
        />
        <CustomModal modal={modal} onClose={closeModal} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Clean 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 text-left font-display text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span>Informatika Kelas 7</span>
          </button>

          {/* Zone 2: Concise Single-Line Nav Links */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className={`transition-colors hover:text-slate-900 whitespace-nowrap shrink-0 ${
                currentPage === 'dashboard' ? 'font-semibold text-blue-600 underline underline-offset-4' : ''
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => navigateTo('materi')}
              className={`transition-colors hover:text-slate-900 whitespace-nowrap shrink-0 ${
                currentPage === 'materi' ? 'font-semibold text-blue-600 underline underline-offset-4' : ''
              }`}
            >
              Materi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('video')}
              className={`transition-colors hover:text-slate-900 whitespace-nowrap shrink-0 ${
                currentPage === 'video' ? 'font-semibold text-blue-600 underline underline-offset-4' : ''
              }`}
            >
              Video
            </button>
            <button
              type="button"
              onClick={() => navigateTo('simulasi')}
              className={`transition-colors hover:text-slate-900 whitespace-nowrap shrink-0 ${
                currentPage === 'simulasi' ? 'font-semibold text-blue-600 underline underline-offset-4' : ''
              }`}
            >
              Simulasi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('tes')}
              className={`transition-colors hover:text-slate-900 whitespace-nowrap shrink-0 ${
                currentPage === 'tes' ? 'font-semibold text-blue-600 underline underline-offset-4' : ''
              }`}
            >
              Tes Evaluasi
            </button>
          </nav>

          {/* Zone 3: Sound & Logout Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
              title={soundEnabled ? 'Suara Efek: Aktif' : 'Suara Efek: Nonaktif'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {currentPage === 'dashboard' && (
          <DashboardPage
            username={username}
            completed={completed}
            bestGameScore={bestGameScore}
            bestTestScore={bestTestScore}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'petunjuk' && (
          <PetunjukPage onBackHome={() => navigateTo('dashboard')} />
        )}

        {currentPage === 'cptp' && <CpTpPage onBackHome={() => navigateTo('dashboard')} />}

        {currentPage === 'materi' && (
          <MateriPage
            onBackHome={() => navigateTo('dashboard')}
            onPlayClick={() => playSound('click')}
            onMarkComplete={() => setCompleted((prev) => ({ ...prev, materi: true }))}
            onCompleteAndNext={() => {
              setCompleted((prev) => ({ ...prev, materi: true }));
              playSound('ok');
              navigateTo('video');
            }}
          />
        )}

        {currentPage === 'video' && (
          <VideoInteraktifPage
            onBackHome={() => navigateTo('dashboard')}
            onVideoCompleted={() => setCompleted((prev) => ({ ...prev, video: true }))}
            onPlayFeedbackSound={playSound}
          />
        )}

        {currentPage === 'games' && (
          <GamesSeruPage
            onBackHome={() => navigateTo('dashboard')}
            onPlaySound={playSound}
            onGameFinish={(score) => {
              setCompleted((prev) => ({ ...prev, games: true }));
              setBestGameScore((prev) => Math.max(prev, score));
            }}
          />
        )}

        {currentPage === 'simulasi' && (
          <SimulasiPage
            username={username}
            onBackHome={() => navigateTo('dashboard')}
            onPlayClick={() => playSound('click')}
          />
        )}

        {currentPage === 'tes' && (
          <LatihanTesPage
            username={username}
            onBackHome={() => navigateTo('dashboard')}
            onPlaySound={playSound}
            onIncompleteWarning={(title, message) => {
              playSound('err');
              openModal({ title, message, type: 'warning', confirmText: 'Lengkapi Sekarang' });
            }}
            onFinishTest={(score) => {
              setCompleted((prev) => ({ ...prev, tes: true }));
              setBestTestScore((prev) => (prev === null ? score : Math.max(prev, score)));
            }}
          />
        )}
      </main>

      <CustomModal modal={modal} onClose={closeModal} />
    </div>
  );
}
