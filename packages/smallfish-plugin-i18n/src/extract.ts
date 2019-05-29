// import { extract } from 'parrot-tool-must';
import fs from 'fs-extra';
import path from 'path';
import mustConfig from './mustConfig';

const execSync = require('child_process').execSync;

export default () => {
  console.info('coming soon');
  return;
  let argvs = [...process.argv].slice(3);

  const source = argvs[0] && './page';
  const projConfigPath = argvs[1];

  const customConfigPath =
    (projConfigPath && path.join(process.cwd(), projConfigPath)) ||
    path.join(process.cwd(), '.i18n.config.json');

  let projConfig = {};
  if (fs.pathExistsSync(customConfigPath)) {
    projConfig = require(customConfigPath);
  }

  const config = {
    source,
    ...projConfig,
  };

  const mconfig = mustConfig(config);

  (async () => {
    // 0. clear i18nMust
    execSync('rm -rf ' + path.join(process.cwd(), 'i18nMust'));

    // 1. must extract
    await extract.run(mconfig, true);

    // 2. get must resources
    const mustI18nDir = path.join(process.cwd(), './i18nMust/strings');

    // 3. get i18n resources
    const i18nDir = path.join(process.cwd(), './i18n');

    // 4. if not has i18n, init it
    if (!fs.pathExistsSync(i18nDir)) {
      fs.copySync(mustI18nDir, i18nDir);
    } else {
      // 5. merge i18n & must
      fs.readdirSync(mustI18nDir).forEach(item => {
        if (!/\.json$/.test(item)) return;

        const mustFilePath = `${mustI18nDir}/${item}`;
        const i18nFilPath = `${i18nDir}/${item}`;

        if (!fs.pathExistsSync(i18nDir)) {
          fs.copySync(mustFilePath, i18nFilPath);
        } else {
          const mustFile = fs.readFileSync(mustFilePath, { encoding: 'utf8' });
          const i18nFile = fs.readFileSync(i18nFilPath, {
            encoding: 'utf8',
          });

          const mustFileContent = JSON.parse(mustFile);
          const i18nFileContent = JSON.parse(i18nFile);

          const newContent = Object.assign(i18nFileContent, mustFileContent);
          fs.writeFileSync(i18nFilPath, JSON.stringify(newContent, null, 2));
        }
      });
    }

    // 0. clear i18nMust
    execSync('rm -rf ' + path.join(process.cwd(), 'i18nMust'));

    console.log('smallfish i18n translation success !');
  })();
};
