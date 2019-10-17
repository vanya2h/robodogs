import webpack from 'webpack';
import { config, paths } from '../config';

const configure = base => ({
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    ...base.entry,
    `webpack-dev-server/client?http://localhost:${config.devServerPort}`,
    'webpack/hot/only-dev-server',
  ],
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: config.devServerPort,
    historyApiFallback: true,
    hot: true,
  },
});

export const getDevelopmentConfig = base => ({ ...base, ...configure(base) });
