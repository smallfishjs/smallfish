import { IApi } from 'umi-types';

export default (api: IApi) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set('smallfish/react', webpackConfig.resolve.alias.get('react'))
      .set('smallfish/react-dom', webpackConfig.resolve.alias.get('react-dom'));
  });
};
