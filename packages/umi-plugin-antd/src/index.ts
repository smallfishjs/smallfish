import { IApi, IChangeWebpackConfig } from 'umi-types';

function importPlugin(key: string) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: 'es',
      style: true,
    },
    key,
  ];
}

export default (api: IApi) => {
  api.modifyAFWebpackOpts((opts: IChangeWebpackConfig) => {
    opts.babel.plugins = [
      ...(opts.babel.plugins || []),
      importPlugin('smallfish/antd'),
    ];
    return opts;
  });

  api.chainWebpackConfig((webpackConfig: IChangeWebpackConfig) => {
    webpackConfig.resolve.alias.set(
      'smallfish/antd',
      webpackConfig.resolve.alias.get('antd'),
    );
  });
};
