import { join } from 'path';
import { IApi } from 'umi-types';
import dva from './dva';

export default (api: IApi, option = {}) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/dva',
      join(__dirname, './entry.js'),
    );
  });

  api.registerPlugin({
    id: '@smallfish-plugin/dva-connect',
    apply: dva,
    opts: {
      ...option,
      dynamicImport: option.dynamicImport,
    },
  });
};
