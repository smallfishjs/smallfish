import { IApi } from 'umi-types';

const plugins = [
  {
    pluginName: '@umijs/umi-plugin-script',
    configName: 'script',
  },
  {
    pluginName: '@umijs/umi-plugin-antd',
    configName: 'antd',
  },
];

export default (api: IApi) => {
  const { config } = api;
  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      singular: true,
    };
  });
  plugins.forEach(({ pluginName, configName, defaultOpts }) => {
    api._registerConfig(() => () => ({
      name: configName,
      onChange(newConfig) {
        api.changePluginOption(pluginName, newConfig[configName]);
      },
    }));
    api.registerPlugin({
      id: pluginName,
      apply: require(pluginName).default,
      opts: config[configName],
    });
  });
};
