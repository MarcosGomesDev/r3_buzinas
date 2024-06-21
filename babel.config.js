module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@types': './src/types',
          '@routes': './src/routes',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@screens': './src/screens',
          '@services': './src/services',
          '@components': './src/components',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
