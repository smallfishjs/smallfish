import { IApi } from 'umi-types';
import postcssPluginNamespace from 'postcss-plugin-namespace';

function importPlugin(tagName) {
  return [
    require.resolve(
      '@quickbaseoss/babel-plugin-styled-components-css-namespace',
    ),
    { cssNamespace: '#' + tagName },
  ];
}

export default (api: IApi, options: { tagName: string }) => {
  if (!/^\w+-\w+/.test(options.tagName)) {
    throw new Error('invalid tagName for custom element');
  }
  api.modifyEntryRender(``);

  api.addEntryCode(`
class SmallfishEl extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const rootContainer = plugins.apply('rootContainer', {
      initialValue: React.createElement(require('./router').default),
    });
    ReactDOM.render(
      rootContainer,
      this,
    );
  }
  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
  attributeChangedCallback() {}
}
customElements.define('${options.tagName}', SmallfishEl);
  `);

  api.modifyHTMLWithAST($ => {
    $('body').prepend(
      `<div id="${options.tagName}"><${options.tagName}/></div>`,
    );
    $('#root').remove();
  });

  api.modifyAFWebpackOpts(opts => {
    opts.babel.plugins = [
      ...(opts.babel.plugins || []),
      importPlugin(options.tagName),
    ];
    return opts;
  });

  api.modifyDefaultConfig(memo => {
    const postCssPlugin = [postcssPluginNamespace(`#${options.tagName}`)];
    const extraPostCSSPlugins = ((memo as any).extraPostCSSPlugin || []).concat(
      postCssPlugin,
    );

    return {
      ...memo,
      extraPostCSSPlugins,
    };
  });
};
