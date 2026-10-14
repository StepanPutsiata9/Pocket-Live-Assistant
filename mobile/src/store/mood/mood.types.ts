import { MOOD_KEYS } from '@/screens/mood/mood.constants';

export type MoodKey = (typeof MOOD_KEYS)[number];

export interface MoodHistoryEntry {
  date: string;
  moodIndex: number;
}

export interface MoodState {
  moodIndex: number;
  history: MoodHistoryEntry[];
  setMoodIndex: (index: number) => void;
  saveMoodForDate: (date: string, moodIndex: number) => void;
}
