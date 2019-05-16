import { IApi,  } from 'umi-types';

export default (api: IApi, opts) => {
  api.onOptionChange((newOpts) => {
    opts = newOpts;
  	api.rebuildHTML();
  });
  api.addHTMLHeadScript(() => {
    if (opts) {
      return opts.map(aScript => {
        if (/^(http:|https:)?\/\//.test(aScript)) {
          return {
            src: aScript,
          };
        }
        return {
          content: aScript,
        };
      });
    } else {
      return [];
    }
  });
}
