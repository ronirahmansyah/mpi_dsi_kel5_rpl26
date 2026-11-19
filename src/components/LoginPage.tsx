import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Lock, LogIn, ShieldCheck, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
  onValidationError: (title: string, message: string) => void;
  onPlayClick: () => void;
}

export function LoginPage({ onLogin, onValidationError, onPlayClick }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser.length < 2) {
      onValidationError(
        'Nama Siswa Diperlukan',
        'Silakan masukkan Username atau Nama Siswa minimal 2 karakter terlebih dahulu.'
      );
      return;
    }

    if (trimmedPass.length < 4) {
      onValidationError(
        'Password Terlalu Pendek',
        'Masukkan Password minimal 4 karakter, atau klik Isi Otomatis untuk memakai akun demo.'
      );
      return;
    }

    onLogin(trimmedUser);
  };

  const fillDemoAccount = () => {
    onPlayClick();
    setUsername('Siswa7_Cerdas');
    setPassword('siber7');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-[1.08fr_1fr]">
        {/* Left Informational & Illustration Panel */}
        <div className="flex flex-col justify-between bg-slate-900 p-8 text-white sm:p-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-sky-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Informatika SMP Kelas 7</span>
              <span aria-hidden="true">·</span>
              <span>Fase D Literasi Digital</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              Media Pembelajaran Interaktif Informatika
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Pelajari cara memilah informasi privat dan publik, memperkuat keamanan data pribadi,
              serta mengelola jejak digital melalui simulasi dan latihan TKA SMP.
            </p>
          </div>

          {/* Domain Illustration SVG */}
          <div className="my-8 flex justify-center">
            <svg
              viewBox="0 0 320 210"
              className="w-full max-w-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ilustrasi keamanan perangkat digital dan perisai privasi"
            >
              <rect x="28" y="34" width="240" height="140" rx="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
              <rect x="40" y="46" width="216" height="108" rx="8" fill="#0F172A" />
              <rect x="12" y="174" width="272" height="14" rx="7" fill="#475569" />
              <rect x="56" y="64" width="88" height="11" rx="5.5" fill="#38BDF8" />
              <rect x="56" y="85" width="114" height="8" rx="4" fill="#64748B" />
              <rect x="56" y="101" width="90" height="8" rx="4" fill="#64748B" />
              <rect x="56" y="121" width="72" height="18" rx="6" fill="#10B981" />
              <path
                d="M222 58L254 70V98C254 119 240 136 222 143C204 136 190 119 190 98V70L222 58Z"
                fill="#0284C7"
                stroke="#BAE6FD"
                strokeWidth="2.5"
              />
              <rect x="211" y="94" width="22" height="18" rx="4" fill="#FDE047" />
              <path
                d="M215 94V88C215 84.134 218.134 81 222 81C225.866 81 229 84.134 229 88V94"
                stroke="#FDE047"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="38" cy="30" r="16" fill="#10B981" />
              <path
                d="M31 30L36 35L45 25"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-xs text-slate-400">
            Mengacu pada Kepka BSKAP No. 46/H/KR/2025 &amp; Perkaban BSKAP No. 47/H/AN/2025
          </p>
        </div>

        {/* Right Login Form Panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Masuk ke Kelas Digital</h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Masukkan nama dan kata sandi belajarmu untuk menyimpan progres selama sesi berlangsung.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="loginUsername" className="block text-sm font-semibold text-slate-800">
                Username (Nama Siswa)
              </label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="loginUsername"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: Raka Pratama"
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pr-4 pl-10 text-sm text-slate-900 transition-colors outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-sm font-semibold text-slate-800">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="loginPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 4 karakter"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pr-11 pl-10 text-sm text-slate-900 transition-colors outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
                  aria-label="Tampilkan atau sembunyikan password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <LogIn className="h-4 w-4" />
              <span>Masuk Belajar</span>
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-800">Akun Demo Cepat</p>
                <p>
                  Username: <code className="font-mono text-blue-700">Siswa7_Cerdas</code> · Pass:{' '}
                  <code className="font-mono text-blue-700">siber7</code>
                </p>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 whitespace-nowrap shrink-0"
              >
                Isi Otomatis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
