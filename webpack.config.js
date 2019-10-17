const { config } = require('./config');
const { getConfig } = require('./webpack');

// eslint-disable-next-line import/no-default-export
export default getConfig(config.nodeEnv);
