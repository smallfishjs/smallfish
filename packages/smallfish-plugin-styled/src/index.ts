import { dirname } from 'path';
import { IApi } from 'umi-types';

export default (api: IApi) => {
  const { cwd, compatDirname } = api;

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set(
        'styled-components',
        compatDirname(
          'styled-components/package.json',
          cwd,
          dirname(require.resolve('styled-components/package.json')),
        ),
      )
      .set(
        'smallfish/styled',
        webpackConfig.resolve.alias.get('styled-components'),
      );
  });
};
