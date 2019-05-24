import { IApi } from 'umi-types';
import { join } from 'path';

export default (api: IApi) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/router',
      join(__dirname, './entry.js'),
    );
  });
};
