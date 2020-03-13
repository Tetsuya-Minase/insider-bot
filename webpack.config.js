const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/src/main.ts'),
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: 'ts-loader'},
          {loader: 'eslint-loader'}
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  output: {
    libraryTarget: 'this',
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  externals: [nodeExternals()]
};
