// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';

const rootDir = path.resolve(__dirname);

export const paths = {
  rootDir,
  sourceDir: path.join(rootDir, 'src'),
  buildDir: path.join(rootDir, 'build'),
};

export const config = {
  devServerPort: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'production',
  paths,
};
