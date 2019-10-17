import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserWebpackPlugin from 'terser-webpack-plugin';

const getOptionalPlugins = () => {
  const plugins = [];

  if (process.env.ANALYZER === 'true') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};

const configure = base => ({
  mode: 'production',
  devtool: false,
  output: {
    ...base.output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
  ]
    .concat(base.plugins)
    .concat(getOptionalPlugins()),
  module: {
    ...base.module,
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ].concat(base.module.rules),
  },
});

export const getProductionConfig = base => ({ ...base, ...configure(base) });
