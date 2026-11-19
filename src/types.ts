export type PageId =
  | 'dashboard'
  | 'petunjuk'
  | 'cptp'
  | 'materi'
  | 'video'
  | 'games'
  | 'simulasi'
  | 'tes';

export type ModuleCompletion = Record<Exclude<PageId, 'dashboard'>, boolean>;

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export interface VideoCheckpoint {
  time: number;
  question: string;
  options: string[];
  correctIndex: number;
  feedbackOk: string;
  feedbackErr: string;
}

export interface StoryScene {
  start: number;
  end: number;
  bg1: string;
  bg2: string;
  speaker: string;
  title: string;
  subtitle: string;
  narration: string;
}

export interface GameMission {
  id: number;
  category: string;
  icon: string;
  title: string;
  scenario: string;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
  feedbackOk: string;
  feedbackErr: string;
}

export interface SimDataItem {
  id: string;
  label: string;
  detail: string;
  recommended: 'privat' | 'publik';
  riskWeight: number;
  positiveWeight: number;
  publicImpact: string;
  privateImpact: string;
}

export interface McQuestion {
  id: number;
  stimulus: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DndItem {
  id: string;
  number: number;
  text: string;
  correctZone: 'privat' | 'publik';
  explanation: string;
}

export interface TfQuestion {
  id: number;
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}
