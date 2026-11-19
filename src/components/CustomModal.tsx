import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import type { ModalConfig } from '../types';

interface CustomModalProps {
  modal: ModalConfig;
  onClose: () => void;
}

export function CustomModal({ modal, onClose }: CustomModalProps) {
  if (!modal.isOpen) return null;

  const iconStyles = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }[modal.type];

  const IconComponent = {
    info: Info,
    warning: AlertTriangle,
    danger: ShieldAlert,
    success: CheckCircle2,
  }[modal.type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl">
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border ${iconStyles}`}
        >
          <IconComponent className="h-7 w-7" />
        </div>
        <h3 id="custom-modal-title" className="text-lg font-bold text-slate-900">
          {modal.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{modal.message}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {modal.cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              {modal.cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onClose();
              modal.onConfirm?.();
            }}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 ${
              modal.type === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {modal.confirmText || 'Mengerti'}
          </button>
        </div>
      </div>
    </div>
  );
}
