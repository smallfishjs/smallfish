import { fork } from 'child_process';
import i18n from './i18n/i18n';

export default () => {
  process.env.UMI_PLUGINS = require.resolve('./plugins');
  const umi = require.resolve('umi/bin/umi');
  let umiArgvs = [...process.argv].slice(2);
  if (umiArgvs[0] === 'cov') {
    umiArgvs = ['test', '--coverage'];
  }

  if (umiArgvs[0] === 'i18n') {
    i18n();
    return;
  }

  const child = fork(umi, umiArgvs, {
    stdio: 'inherit',
  });
  child.on('exit', code => {
    process.exit(code);
  });
  process.on('SIGINT', () => {
    child.kill('SIGINT');
  });
};
