export type Lang = 'en' | 'ru';

const notificationStrings: Record<Lang, Record<string, string>> = {
  en: {
    dailyExpensePushTitle: 'Please pay attention to the expenses!',
    dailyExpensePushMessage: 'Write down your expenses for today.',
    lunchPushTitle: 'Lunch time!',
    lunchPushMessage: "It's time to take a break and have lunch!",
    dailyTasksPushTitle: 'Time to tidy up!',
    limitExceeding: 'Exceeding the limit!',
    limitWarning:
      'You have exceeded the limit. Please be more careful with your spending!',
    foodLimitExceeded: 'Limit Exceeded!',
    foodLimitWarning: 'You have exceeded your daily calorie limit.',
  },
  ru: {
    dailyExpensePushTitle: 'Пора внести расходы!',
    dailyExpensePushMessage: 'Запиши свои сегодняшние траты.',
    lunchPushTitle: 'Время обеда!',
    lunchPushMessage: 'Пора сделать перерыв и пообедать!',
    dailyTasksPushTitle: 'Пора за уборку!',
    limitExceeding: 'Превышение лимита!',
    limitWarning:
      'Вы превысили лимит. Пожалуйста, будьте внимательнее со своими тратами!',
    foodLimitExceeded: 'Превышение лимита!',
    foodLimitWarning: 'Вы превысили суточную норму калорий.',
  },
};

export const localizeNotification = (
  key: string,
  lang: Lang = 'en',
): string => {
  const table = notificationStrings[lang] ?? notificationStrings.en;
  return table[key] ?? notificationStrings.en[key] ?? key;
};
