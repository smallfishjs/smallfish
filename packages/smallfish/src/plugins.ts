import { IApi } from 'umi-types';

const plugins = [
  {
    pluginName: '@smallfish-plugin/script',
    configName: 'script',
    defaultOptions: false,
  },
  {
    pluginName: '@smallfish-plugin/style',
    configName: 'style',
    defaultOptions: false,
  },
  {
    pluginName: '@smallfish-plugin/antd',
    configName: 'antd',
    defaultOptions: true,
  },
  {
    pluginName: '@smallfish-plugin/router',
    configName: 'router',
    defaultOptions: true,
  },
  {
    pluginName: '@smallfish-plugin/request',
    configName: 'request',
    defaultOptions: true,
  },
  {
    pluginName: '@smallfish-plugin/dva',
    configName: 'dva',
    defaultOptions: false,
  },
  {
    pluginName: '@smallfish-plugin/lint',
    configName: 'lint',
    defaultOptions: true,
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

  plugins.forEach(({ pluginName, configName, defaultOptions }) => {
    api._registerConfig(() => () => ({
      name: configName,
      onChange(newConfig) {
        const options = newConfig[configName];
        if (options) {
          api.changePluginOption(pluginName, options);
        } else {
          api.restart();
        }
      },
    }));

    let opts;
    if (config[configName] !== false) {
      opts = config[configName] || defaultOptions
    }
    api.registerPlugin({
      id: pluginName,
      apply(...args) {
        if (opts) {
          require(pluginName).default(...args);
        }
      },
      opts,
    }); 
  });
};
