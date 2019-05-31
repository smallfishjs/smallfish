import { join } from 'path';
import { IApi } from 'umi-types';
import config from './config';

const plugins = config.plugins;


export default (api: IApi) => {
  const { config } = api;

  const addPlugins = (list) => {
    list.forEach(plugin => {
      if (plugins.find(item => item.configName === plugin.configName)) {
        api.log.error(`The config name "${item.configName}" is exists, you need to change the config name.`);
        process.exit(1);
      }
      const obj = plugins.find(item => item.pluginName === plugin.pluginName);
      if (obj) {
        plugins[plugins.indexOf(obj)] = plugin;
      } else {
        plugins.push(plugin);
      }
    });
  };

  if (process.env.CONFIG_PLUGIN) {
    let list = require(process.env.CONFIG_PLUGIN);
    list = list.default || list;
    api.log.info('You are using "CONFIG_PLUGIN"');
    addPlugins(list);
  }

  try {
    let list = require(join(api.cwd, 'config/plugin'));
    list = list.default || list;
    api.log.info('You are using custom plugin');
    addPlugins(list);
  } catch (err) {
  }
  
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
