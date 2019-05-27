import { IApi } from 'umi-types';
import config from './config';


const realConfig = process.env.SMALLFISH_CONFIG ? require(process.env.SMALLFISH_CONFIG) : config;
const plugins = realConfig.plugins;

export default (api: IApi) => {
  const { config } = api;

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
