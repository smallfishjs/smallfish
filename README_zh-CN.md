# smallfish

[![NPM version](https://img.shields.io/npm/v/smallfish.svg?style=flat)](https://npmjs.org/package/smallfish)

[English](./README.md) | 中文

smallfish 是基于 [umi](https://umijs.org/) 的开箱即用的 React 框架。smallfish 内置了很多开发工具及功能库，通过约定的方式让使用者只需关注到要开发的业务，而不需要在底层工具及配置上纠结及消耗能量，一切都很轻松。


- 内置 React，antd，antd pro，dva 等功能，只需要依赖一个 smallfish 即可
- 内置路由，通过方便的路由配置即可完成复杂的路由需求
- 内置 dev，build，eslint，stylelint 等功能
- 默认支持 TypeScript，零配置使用
- 可基于 smallfish 通过插件方式打造你的专有工具

# 使用

注意！暂时还在开发中，可通过 [脚手架](https://github.com/smallfishjs/smallfish-boilerplates-management-system) 进行试用。

```
$ npm install smallfish
$ smallfish dev
```

# 开发

```
$ yarn
$ yarn bootstrap
$ yarn build
$ cd packages/smallfish
$ yarn link
$ cd ../../examples/func-test
$ smallfish dev
```