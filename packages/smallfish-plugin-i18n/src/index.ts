import { IApi } from 'umi-types';
import { join } from 'path';

import extract from './extract';

export default (api: IApi) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/i18n',
      join(__dirname, './i18n.js'),
    );
  });

  api.registerCommand(
    'i18n',
    {
      description: 'run i18n for extracting your copywriting of project',
    },
    () => {
      extract();
    },
  );
};
