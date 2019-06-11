import { dirname } from 'path';
import { IApi } from 'umi-types';

export default (api: IApi) => {
  const { cwd, compatDirname } = api;

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/request',
      compatDirname(
        'axios/package.json',
        cwd,
        dirname(require.resolve('axios/package.json')),
      ),
    );
    webpackConfig.resolve.alias.set(
      'smallfish/fetch',
      compatDirname(
        'axios/package.json',
        cwd,
        dirname(require.resolve('axios/package.json')),
      ),
    );
  });
};
