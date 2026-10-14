module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@navigation': './src/navigation',
            '@store': './src/store',
          },
        },
      ],
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
          autoProcessPaths: ['react-native-vector-icons'],
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
