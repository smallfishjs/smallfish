import { dirname } from 'path';

function importPlugin(key: string) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    key,
  ];
}

export default function(api, options = {}) {
  const { cwd, compatDirname } = api;

  api.modifyAFWebpackOpts(opts => {
    opts.babel.plugins = [
      ...(opts.babel.plugins || []),
      importPlugin('lodash', options),
      importPlugin('smallfish/lodash', options),
    ];
    return opts;
  });

  const getPath = lib =>
    compatDirname(
      `${lib}/package.json`,
      cwd,
      dirname(require.resolve(`${lib}/package.json`)),
    );

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set('smallfish/util/classnames', getPath('classnames'))
      .set('smallfish/util/debug', getPath('debug'))
      .set('smallfish/util/js-cookie', getPath('js-cookie'))
      .set('smallfish/util/lodash', getPath('lodash'))
      .set('smallfish/util/prop-types', getPath('prop-types'))
      .set('smallfish/util/query-string', getPath('query-string'))
      .set('smallfish/util/uuid', getPath('uuid'))
      .set(
        'smallfish/util/react-document-title',
        getPath('react-document-title'),
      )
      .set(
        'smallfish/util/moment',
        compatDirname(
          `moment/package.json`,
          cwd,
          dirname(require.resolve(`moment/package.json`)),
          'package',
        ),
      );
  });
}
