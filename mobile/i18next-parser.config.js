module.exports = {
  input: ['src/**/*.{ts,tsx}'],
  output: 'src/i18n/locales/$LOCALE.json',
  locales: ['en', 'ru'],
  sort: true,
  defaultValue: (locale, _, key) => (locale === 'en' ? key : ''),
  keySeparator: '.',
  nsSeparator: false,
  createOldCatalogs: false,
};
