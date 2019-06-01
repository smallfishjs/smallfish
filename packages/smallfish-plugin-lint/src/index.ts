import { fork } from 'child_process';
import { join } from 'path';
import { IApi } from 'umi-types';

export default (api: IApi, options = {}) => {
  const cwd = api.cwd;
  api.registerCommand(
    'lint',
    {
      description: 'run lint for check your code format',
    },
    () => {
      const lint = require.resolve('umi-lint/bin/umi-lint');
      const args = [...process.argv].slice(3);
      const argv = require('yargs').argv;
      if (!argv.prettier && !argv.eslint && !argv.tslint && !argv.stylelint) {
        args.unshift('--eslint');
      }

      // 如果非 staged 模式，并且没有指定路径，默认扫描全部
      if (!argv.staged && argv._.length === 1) {
        args.push(join(cwd, '**'));
      }
      const child = fork(lint, args, {
        stdio: 'inherit',
      });
      child.on('exit', code => {
        process.exit(code);
      });
      process.on('SIGINT', () => {
        child.kill('SIGINT');
      });
    }
  );
};
