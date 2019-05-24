import { IApi } from 'umi-types';
import { join } from 'path';

export default (api: IApi) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set('smallfish/request', join(__dirname, './request.js'))
      .set('smallfish/fetch', join(__dirname, './request.js'));
  });
};
