// Modify from https://github.com/umijs/umi/blob/master/packages/umi-plugin-react/src/plugins/antd.js
// When it provides "antd plugin", the code will be refactored

import { dirname, join } from 'path';
import { IApi } from 'umi-types';

function importPlugin(key: string, options) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: process.env.ANTD_IMPORT_DIRECTORY || options.importDirectory || 'es',
      style: true,
    },
    key,
  ];
}

export default (api: IApi, options = {}) => {
  const { cwd, compatDirname } = api;

  const antdDir = compatDirname(
    'antd/package.json',
    cwd,
    dirname(require.resolve('antd/package.json')),
  );
  // eslint-disable-next-line import/no-dynamic-require
  const antdVersion = require(join(antdDir, 'package.json')).version;
  api.addVersionInfo([`antd@${antdVersion} (${antdDir})`]);

  api.modifyAFWebpackOpts(opts => {
    opts.babel.plugins = [
      ...(opts.babel.plugins || []),
      importPlugin('antd', options),
      importPlugin('smallfish/antd', options),
    ];
    return opts;
  });

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set(
        'antd',
        compatDirname('antd/package.json', cwd, dirname(require.resolve('antd/package.json'))),
      ).
      set(
        'smallfish/antd',
        webpackConfig.resolve.alias.get('antd'),
      );
  });
};

