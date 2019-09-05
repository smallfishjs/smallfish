import { IApi } from 'umi-types';


export default (api: IApi, options = {}) => {
  process.env.BROWSER = process.env.BROWSER || 'none';
  process.env.CLEAR_CONSOLE = process.env.CLEAR_CONSOLE || 'none';
  const argv = require('yargs-parser')(process.argv);
  if (!process.env.PORT && argv.port) {
    process.env.PORT = argv.port;
  }
  api.config.disableGlobalVariables = true;
  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      disableGlobalVariables: true,
      history: 'hash',
      singular: true,
    };
  });
};
