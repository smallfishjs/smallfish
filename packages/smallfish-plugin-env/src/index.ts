import { IApi } from 'umi-types';


export default (api: IApi, options = {}) => {
  process.env.BROWSER = process.env.BROWSER || 'none';
  process.env.CLEAR_CONSOLE = process.env.CLEAR_CONSOLE || 'none';
  const argv = require('yargs-parser')(process.argv);
  if (!process.env.PORT) {
    if (argv.port) {
      process.env.PORT = argv.port;
    } else {
      process.env.PORT = 7001;
    }
  }
  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      history: 'hash',
      singular: true,
    };
  });
};
