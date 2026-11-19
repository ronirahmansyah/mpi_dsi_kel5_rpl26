import { useCallback, useEffect, useRef, useState } from 'react';
import { Home, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { STORY_SCENES, VIDEO_CHECKPOINTS, VIDEO_DURATION } from '../data/learningData';
import type { VideoCheckpoint } from '../types';

interface VideoInteraktifPageProps {
  onBackHome: () => void;
  onVideoCompleted: () => void;
  onPlayFeedbackSound: (type: 'ok' | 'err' | 'click') => void;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  shirtColor: string,
  name: string,
  active: boolean
) {
  ctx.save();
  // Glow ring when speaking/active
  if (active) {
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.beginPath();
    ctx.arc(x, y, 68, 0, Math.PI * 2);
    ctx.fill();
  }
  // Body
  ctx.fillStyle = shirtColor;
  drawRoundedRect(ctx, x - 34, y + 18, 68, 72, 22);
  ctx.fill();
  // Head
  ctx.fillStyle = '#FDBA74';
  ctx.beginPath();
  ctx.arc(x, y - 16, 30, 0, Math.PI * 2);
  ctx.fill();
  // Hair
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(x, y - 24, 30, Math.PI, Math.PI * 2);
  ctx.fill();
  // Eyes
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(x - 10, y - 16, 3.2, 0, Math.PI * 2);
  ctx.arc(x + 10, y - 16, 3.2, 0, Math.PI * 2);
  ctx.fill();
  // Smile
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y - 9, 8, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  // Name badge
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundedRect(ctx, x - 38, y + 96, 76, 24, 8);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + 112);
  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

export function VideoInteraktifPage({
  onBackHome,
  onVideoCompleted,
  onPlayFeedbackSound,
}: VideoInteraktifPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [answeredIndices, setAnsweredIndices] = useState<number[]>([]);
  const [activeCheckpointIdx, setActiveCheckpointIdx] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const timeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const triggeredRef = useRef<Set<number>>(new Set());
  const lastNarratedSceneRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const speakText = useCallback(
    (text: string) => {
      if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'id-ID';
        utter.rate = 1.02;
        window.speechSynthesis.speak(utter);
      } catch {
        // Ignore TTS failure
      }
    },
    [voiceEnabled]
  );

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const drawFrame = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const sceneIdxRaw = STORY_SCENES.findIndex((s) => t >= s.start && t <= s.end);
    const sceneIdx = sceneIdxRaw >= 0 ? sceneIdxRaw : STORY_SCENES.length - 1;
    const scene = STORY_SCENES[sceneIdx];

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, scene.bg1);
    grad.addColorStop(1, scene.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle Grid Lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Scene Pill Header
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    drawRoundedRect(ctx, 32, 24, 440, 40, 12);
    ctx.fill();
    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(scene.title, 50, 50);

    const bob = Math.sin(t * 3.2) * 5;

    // Raka (Left) & Sinta (Right)
    drawCharacter(ctx, 185, 220 + bob, '#38BDF8', 'RAKA', sceneIdx === 0 || sceneIdx === 2);
    drawCharacter(ctx, 775, 220 - bob, '#A855F7', 'SINTA', sceneIdx === 1 || sceneIdx === 3);

    // Center Visual Prop per Scene
    ctx.save();
    ctx.translate(480, 200 - bob * 0.4);
    if (sceneIdx === 0) {
      // Kartu Pelajar
      ctx.fillStyle = '#FFFFFF';
      drawRoundedRect(ctx, -125, -75, 250, 150, 14);
      ctx.fill();
      ctx.fillStyle = '#2563EB';
      drawRoundedRect(ctx, -125, -75, 250, 34, 14);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('KARTU PELAJAR SMP', 0, -52);
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(-105, -26, 56, 72);
      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'left';
      ctx.font = 'bold 13px "DM Sans", sans-serif';
      ctx.fillText('Nama: Raka Pratama', -36, -12);
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#DC2626';
      ctx.fillText('NISN: 0012345678', -36, 10);
      ctx.fillText('Lahir: 12-05-2013', -36, 28);
      ctx.fillText('Jl. Merpati No. 8', -36, 46);
    } else if (sceneIdx === 1) {
      // Warning Shield
      ctx.fillStyle = '#FEF2F2';
      drawRoundedRect(ctx, -135, -75, 270, 150, 16);
      ctx.fill();
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#DC2626';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STOP! DATA PRIVAT!', 0, -32);
      ctx.fillStyle = '#7F1D1D';
      ctx.font = '14px "DM Sans", sans-serif';
      ctx.fillText('NISN, Alamat, & Tanggal Lahir', 0, 2);
      ctx.fillText('bisa disalahgunakan penipu!', 0, 26);
    } else if (sceneIdx === 2) {
      // Poster Karya Publik
      ctx.fillStyle = '#ECFDF5';
      drawRoundedRect(ctx, -135, -75, 270, 150, 16);
      ctx.fill();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('KARYA POSTER POSITIF', 0, -32);
      ctx.fillStyle = '#065F46';
      ctx.font = '14px "DM Sans", sans-serif';
      ctx.fillText('Aman dibagikan ke Publik 🌐', 0, 2);
      ctx.fillText('Data kartu pelajar tetap Privat 🔒', 0, 28);
    } else {
      // Final Shield 2FA
      ctx.fillStyle = '#EFF6FF';
      drawRoundedRect(ctx, -145, -75, 290, 150, 16);
      ctx.fill();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#1D4ED8';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WARGA DIGITAL CERDAS', 0, -28);
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '14px "DM Sans", sans-serif';
      ctx.fillText('Privat Terjaga · Akun 2FA Aktif', 0, 4);
      ctx.fillText('Jejak Digital Bersih & Positif', 0, 28);
    }
    ctx.restore();

    // Bottom Subtitle Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    drawRoundedRect(ctx, 32, H - 124, W - 64, 96, 14);
    ctx.fill();
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(scene.speaker, 52, H - 94);
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '16px "DM Sans", sans-serif';
    wrapText(ctx, scene.subtitle, 52, H - 68, W - 108, 22);
  }, []);

  useEffect(() => {
    drawFrame(0);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopSpeech();
    };
  }, [drawFrame, stopSpeech]);

  const startLoop = useCallback(() => {
    lastTsRef.current = null;

    const tick = (ts: number) => {
      if (!isPlayingRef.current) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const nextTime = Math.min(VIDEO_DURATION, timeRef.current + dt);
      timeRef.current = nextTime;
      setCurrentTime(nextTime);
      drawFrame(nextTime);

      // Check scene narration change
      const sceneIdx = STORY_SCENES.findIndex((s) => nextTime >= s.start && nextTime <= s.end);
      if (sceneIdx >= 0 && sceneIdx !== lastNarratedSceneRef.current) {
        lastNarratedSceneRef.current = sceneIdx;
        speakText(STORY_SCENES[sceneIdx].narration);
      }

      // Check checkpoints
      for (let i = 0; i < VIDEO_CHECKPOINTS.length; i++) {
        const cp = VIDEO_CHECKPOINTS[i];
        if (!triggeredRef.current.has(i) && nextTime >= cp.time) {
          triggeredRef.current.add(i);
          isPlayingRef.current = false;
          setIsPlaying(false);
          stopSpeech();
          setSelectedOption(null);
          setActiveCheckpointIdx(i);
          return;
        }
      }

      if (nextTime >= VIDEO_DURATION) {
        isPlayingRef.current = false;
        setIsPlaying(false);
        onVideoCompleted();
        onPlayFeedbackSound('ok');
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [drawFrame, onPlayFeedbackSound, onVideoCompleted, speakText, stopSpeech]);

  const togglePlay = () => {
    if (activeCheckpointIdx !== null) return;
    onPlayFeedbackSound('click');

    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      stopSpeech();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      if (timeRef.current >= VIDEO_DURATION) {
        timeRef.current = 0;
        setCurrentTime(0);
        triggeredRef.current.clear();
        setAnsweredIndices([]);
        lastNarratedSceneRef.current = -1;
      }
      isPlayingRef.current = true;
      setIsPlaying(true);
      startLoop();
    }
  };

  const restartVideo = () => {
    onPlayFeedbackSound('click');
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    stopSpeech();
    isPlayingRef.current = false;
    setIsPlaying(false);
    timeRef.current = 0;
    setCurrentTime(0);
    triggeredRef.current.clear();
    setAnsweredIndices([]);
    setActiveCheckpointIdx(null);
    setSelectedOption(null);
    lastNarratedSceneRef.current = -1;
    drawFrame(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeCheckpointIdx !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * VIDEO_DURATION;
    timeRef.current = targetTime;
    setCurrentTime(targetTime);
    lastNarratedSceneRef.current = -1;
    drawFrame(targetTime);
  };

  const handleAnswerCheckpoint = (optIdx: number) => {
    if (selectedOption !== null || activeCheckpointIdx === null) return;
    setSelectedOption(optIdx);
    const cp = VIDEO_CHECKPOINTS[activeCheckpointIdx];
    const isCorrect = optIdx === cp.correctIndex;
    onPlayFeedbackSound(isCorrect ? 'ok' : 'err');
    setAnsweredIndices((prev) =>
      prev.includes(activeCheckpointIdx) ? prev : [...prev, activeCheckpointIdx]
    );
  };

  const resumeAfterCheckpoint = () => {
    setActiveCheckpointIdx(null);
    setSelectedOption(null);
    isPlayingRef.current = true;
    setIsPlaying(true);
    startLoop();
  };

  const formatTime = (sec: number) => {
    const s = Math.floor(sec);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const activeCp: VideoCheckpoint | null =
    activeCheckpointIdx !== null ? VIDEO_CHECKPOINTS[activeCheckpointIdx] : null;

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Play className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Video Interaktif: Informasi Privat &amp; Publik
            </h2>
            <p className="text-sm text-slate-600">
              Kisah Raka &amp; Foto Kartu Pelajar — Jawab 3 kuis checkpoint di tengah tayangan.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            isPlayingRef.current = false;
            setIsPlaying(false);
            stopSpeech();
            onBackHome();
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Menu Utama</span>
        </button>
      </div>

      {/* Interactive Canvas Video Stage */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="block aspect-video w-full bg-slate-900"
        />

        {/* Checkpoint Pop-up Overlay */}
        {activeCp && activeCheckpointIdx !== null && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xs">
            <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
              <p className="text-xs font-bold text-amber-700">
                Kuis Checkpoint {activeCheckpointIdx + 1} dari {VIDEO_CHECKPOINTS.length}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug text-slate-900">
                {activeCp.question}
              </h3>

              <div className="mt-4 space-y-2.5">
                {activeCp.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-200 bg-white text-slate-800 hover:border-blue-500 hover:bg-blue-50/40';
                  if (selectedOption !== null) {
                    if (idx === activeCp.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-red-400 bg-red-50 text-red-900';
                    } else {
                      btnStyle = 'border-slate-200 bg-slate-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleAnswerCheckpoint(idx)}
                      className={`w-full rounded-xl border p-3.5 text-left text-sm transition-colors ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div
                  className={`mt-4 rounded-xl p-3.5 text-sm ${
                    selectedOption === activeCp.correctIndex
                      ? 'bg-emerald-50 text-emerald-900'
                      : 'bg-red-50 text-red-900'
                  }`}
                >
                  {selectedOption === activeCp.correctIndex
                    ? activeCp.feedbackOk
                    : activeCp.feedbackErr}
                </div>
              )}

              {selectedOption !== null && (
                <button
                  type="button"
                  onClick={resumeAfterCheckpoint}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <Play className="h-4 w-4" />
                  <span>Lanjutkan Tayangan</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Video Controls */}
        <div className="space-y-3 bg-slate-800 px-5 py-4 text-white">
          <div
            onClick={handleSeek}
            role="slider"
            aria-label="Garis waktu video"
            aria-valuemin={0}
            aria-valuemax={VIDEO_DURATION}
            aria-valuenow={Math.round(currentTime)}
            tabIndex={0}
            className="relative h-3 w-full cursor-pointer rounded-full bg-slate-700"
          >
            <div
              className="h-full rounded-full bg-sky-400 transition-all duration-100"
              style={{ width: `${(currentTime / VIDEO_DURATION) * 100}%` }}
            />
            {VIDEO_CHECKPOINTS.map((cp, idx) => {
              const isDone = answeredIndices.includes(idx);
              return (
                <div
                  key={cp.time}
                  title={`Checkpoint ${idx + 1}`}
                  className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
                    isDone ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ left: `${(cp.time / VIDEO_DURATION) * 100}%` }}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Jeda' : 'Putar Cerita'}</span>
              </button>
              <button
                type="button"
                onClick={restartVideo}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:bg-slate-600 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Ulangi</span>
              </button>
              <span className="font-mono text-xs text-slate-300 tabular-nums">
                {formatTime(currentTime)} / {formatTime(VIDEO_DURATION)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (!next) stopSpeech();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-600 whitespace-nowrap shrink-0"
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span>Narasi Suara: {voiceEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">Ringkasan Skenario Video</h3>
          <p className="mt-1 text-sm text-slate-600">
            Cerita animasi ini mengisahkan Raka yang hampir mengunggah foto kartu pelajarnya ke
            publik. Tonton sampai detik ke-36 dan jawab 3 Checkpoint Kuis di titik kuning garis
            waktu.
          </p>
        </div>
        <div className="text-sm font-semibold text-blue-700 tabular-nums">
          Checkpoint: {answeredIndices.length} / {VIDEO_CHECKPOINTS.length} Terjawab
        </div>
      </div>
    </div>
  );
}
