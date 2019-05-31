import { dirname } from 'path';
import { IApi } from 'umi-types';

export default (api: IApi) => {
  const { cwd, compatDirname } = api;

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/request',
      compatDirname(
        'umi-request/package.json',
        cwd,
        dirname(require.resolve('umi-request/package.json')),
      ),
    );
  });
};
