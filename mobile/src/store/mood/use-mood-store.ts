import { MOOD_KEYS } from '@screens/mood/mood.constants';
import { mmkvMoodStorage } from '@store/mmkv-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MoodKey = (typeof MOOD_KEYS)[number];

interface MoodState {
  moodIndex: number;
  setMoodIndex: (index: number) => void;
}

export const useMoodStore = create<MoodState>()(
  persist(
    set => ({
      moodIndex: 3,
      setMoodIndex: moodIndex => set({ moodIndex }),
    }),
    {
      name: 'mood-storage',
      storage: createJSONStorage(() => mmkvMoodStorage),
    },
  ),
);

export const getMood = (): MoodKey =>
  MOOD_KEYS[useMoodStore.getState().moodIndex] || 'okay';
