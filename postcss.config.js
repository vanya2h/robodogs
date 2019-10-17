// eslint-disable-next-line import/no-extraneous-dependencies
import createResolver from 'postcss-import-webpack-resolver';
import { paths } from './config';

module.exports = {
  plugins: {
    'postcss-import': {
      resolve: createResolver({
        alias: {
          '~': paths.sourceDir,
        },
      }),
    },
    'postcss-nesting': {},
    'postcss-custom-media': {
      // importFrom: './src/css/media.json',
    },
    'postcss-custom-properties': {
      preserve: false,
    },
    'postcss-calc': {},
    'postcss-color-function': {},
    'postcss-selector-matches': {},
    'postcss-flexbugs-fixes': {},
    autoprefixer: {},
    'postcss-csso': {},
  },
};
