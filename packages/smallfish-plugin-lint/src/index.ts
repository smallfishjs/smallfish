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
      if (!argv.staged) {
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
