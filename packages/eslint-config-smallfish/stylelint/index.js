// reference: https://github.com/ant-design/ant-design-pro/blob/master/.stylelintrc.json

module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "declaration-empty-line-before": null,
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": null,
    "selector-pseudo-element-colon-notation": null,
    "font-family-no-missing-generic-family-keyword": null  // fix iconfont 的报错
  },
};
