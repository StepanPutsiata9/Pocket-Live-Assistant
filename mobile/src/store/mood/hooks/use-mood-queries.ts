import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import i18n from '@/i18n';
import { deleteMood, getMoods, MoodEntry, upsertMood } from '@/services/mood';

import { MOOD_KEYS } from '../mood.constants';

export const useMoods = () => {
  const query = useQuery({
    queryKey: MOOD_KEYS.moods,
    queryFn: getMoods,
    staleTime: 1000 * 60,
  });

  return {
    moods: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useUpsertMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertMood,

    onMutate: async newEntry => {
      await queryClient.cancelQueries({ queryKey: MOOD_KEYS.moods });

      const previous =
        queryClient.getQueryData<MoodEntry[]>(MOOD_KEYS.moods) ?? [];

      queryClient.setQueryData<MoodEntry[]>(MOOD_KEYS.moods, old => {
        const filtered = (old ?? []).filter(e => e.date !== newEntry.date);
        return [...filtered, { ...newEntry, id: `temp-${Date.now()}` }];
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(MOOD_KEYS.moods, context.previous);
      }
      Toast.show({
        type: 'error',
        text1: i18n.t('Mood.networkError'),
        text2: i18n.t('Mood.tryLater'),
        position: 'top',
        visibilityTime: 4000,
      });
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: i18n.t('Mood.savedTitle'),
        position: 'top',
        visibilityTime: 2500,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MOOD_KEYS.moods });
    },
  });
};

export const useDeleteMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMood(id),

    onMutate: async deletedId => {
      await queryClient.cancelQueries({ queryKey: MOOD_KEYS.moods });

      const previous =
        queryClient.getQueryData<MoodEntry[]>(MOOD_KEYS.moods) ?? [];

      queryClient.setQueryData<MoodEntry[]>(MOOD_KEYS.moods, old =>
        (old ?? []).filter(e => e.id !== deletedId),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(MOOD_KEYS.moods, context.previous);
      }
      Toast.show({
        type: 'error',
        text1: i18n.t('Mood.networkError'),
        text2: i18n.t('Mood.tryLater'),
        position: 'top',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MOOD_KEYS.moods });
    },
  });
};
