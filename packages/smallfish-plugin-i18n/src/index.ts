import { IApi } from 'umi-types';
import { join } from 'path';

import extract from './extract';

export default (api: IApi, options) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/i18n',
      join(__dirname, './i18n.js'),
    );
  });

  api.addEntryCode(`
    import i18n, { languageDetector } from 'smallfish/i18n';
    import resources from '@/i18n';

    Object.keys(resources).map(key => {
      resources[key] = {
        translation: resources[key],
      };
    });

    const customParams = ${JSON.stringify(options)};

    const params = {
      resources,
      fallbackLng: {
        en: ['en-Us'],
        default: ['en-US'],
      },
      ...customParams,
    };
    i18n.use(languageDetector).init(params);
    `);

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
