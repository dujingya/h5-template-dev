module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'usage',
        corejs: '3.0.0'
      }
    ],
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: '3.0.0',
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
        }
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-arrow-functions'
  ]
};
