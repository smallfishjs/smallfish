import { dirname, join } from 'path';

function importPlugin(key: string, options) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: options.importDirectory || 'lib',
      style: true,
      camel2DashComponentName: false,
    },
    key,
  ];
}

export default function(api, options = {}) {
  const { cwd, compatDirname } = api;

  const antdProDir = compatDirname(
    'ant-design-pro/package.json',
    cwd,
    dirname(require.resolve('ant-design-pro/package.json')),
  );
  // eslint-disable-next-line import/no-dynamic-require
  const antdProVersion = require(join(antdProDir, 'package.json')).version;
  api.addVersionInfo([`ant-design-pro@${antdProVersion} (${antdProDir})`]);

  api.modifyAFWebpackOpts(opts => {
    opts.babel.plugins = [
      ...(opts.babel.plugins || []),
      importPlugin('ant-design-pro', options),
      importPlugin('smallfish/ant-design-pro', options),
    ];
    return opts;
  });

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'smallfish/ant-design-pro',
      compatDirname(
        'ant-design-pro/package.json',
        cwd,
        dirname(require.resolve('ant-design-pro/package.json')),
      ),
    );
  });
}
