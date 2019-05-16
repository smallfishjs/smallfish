import { fork } from 'child_process';

export default () => {
  process.env.UMI_PLUGINS = require.resolve('./plugins');
  const umi = require.resolve('umi/bin/umi');
  let umiArgvs = [...process.argv].slice(2);
  if (umiArgvs[0] === 'cov') {
    umiArgvs = ['test', '--coverage'];
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
