import { IApi } from 'umi-types';

const plugins = [
  {
    pluginName: '@smallfish-plugin/script',
    configName: 'script',
  },
  {
    pluginName: '@smallfish-plugin/style',
    configName: 'style',
  },
  {
    pluginName: '@smallfish-plugin/antd',
    configName: 'antd',
  },
  {
    pluginName: '@smallfish-plugin/router',
    configName: 'router',
  },
  {
    pluginName: '@smallfish-plugin/request',
    configName: 'request',
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
  plugins.forEach(({ pluginName, configName }) => {
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
