import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import { config, paths } from '../config';
import { getDevelopmentConfig } from './development.config';
import { getProductionConfig } from './production.config';

const base = {
  entry: [
		`${paths.sourceDir}/index.ts`,
		`${paths.sourceDir}/styles/global.css`
	],
  output: {
    path: paths.buildDir,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.css'],
    alias: {
      '~': paths.sourceDir,
    },
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(png|gif|jpeg|svg|woff|woff2|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
			}
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(
        paths.rootDir,
        config.nodeEnv === 'production' ? '.env.prod' : '.env.dev',
      ),
    }),
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: `${paths.sourceDir}/index.html`,
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};

export const getConfig = env => {
  if (env === 'production') {
    return getProductionConfig(base);
  }

  if (env === 'development') {
    return getDevelopmentConfig(base);
  }

  throw new Error('Environment is not specified');
};
