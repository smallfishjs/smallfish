import { IApi } from 'umi-types';
import { join } from 'path';

export default (api: IApi) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/i18n',
      join(__dirname, './i18n.js'),
    );
  });
};
