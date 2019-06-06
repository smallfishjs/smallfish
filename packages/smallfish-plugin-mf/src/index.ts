import { IApi } from 'umi-types';

export default (api: IApi, options: { tagName: string }) => {

  if (!/^\w+-\w+/.test(options.tagName)) {
    throw new Error("invalid tagName for custom element")
  }
  api.modifyEntryRender(``)

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
  `)

  api.modifyHTMLWithAST(($) => {
    $('body').prepend(`<${options.tagName}/>`);
    $('#root').remove();
  });
}