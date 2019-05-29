const path = require('path');

const exclude = ['__tests__', 'stories', '.umi'].join('|');

const mustConfigTpl = config => {
  return {
    cwd: process.cwd(),
    name: 'sf',
    sourcePath: config.source || './',
    fileType: config.fileType || 'js',
    prettier: true,
    exclude: `/${config.exclude || exclude}/`,
    matchCopy: (text, path) => {
      const isLog = /^console\.[\w]*\(|^debug\(/gi.test(
        path.parentPath.toString(),
      );
      return /[^\x00-\xff]/.test(text) && !isLog;
    },
    macro: {
      path: 'i18nMust',
      method: "i18n.t('$key$')",
      import: "import i18n from 'smallfish/i18n'",
      keySplitter: '_',
      dependencies: [],
      // keyGenerator: defaultKeyGenerator,
      placeholder: variable => {
        return `{{${variable}}}`;
      },
    },
    babel: {
      allowImportExportEverywhere: true,
      plugins: [
        'asyncGenerators',
        'classProperties',
        'decorators-legacy',
        'doExpressions',
        'exportExtensions',
        'exportDefaultFrom',
        'typescript',
        'functionSent',
        'functionBind',
        'jsx',
        'objectRestSpread',
        'dynamicImport',
        'numericSeparator',
        'optionalChaining',
        'optionalCatchBinding',
      ],
    },
    isNeedUploadCopyToMedusa: false,
    sourceLang: config.sourceLang || 'zh-CN',
  };
};

module.exports = mustConfigTpl;
