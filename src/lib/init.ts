import * as inquirer from 'inquirer';
import shell from 'shelljs';
import log from '../utils/log';
import download from './git-download.js';

let gitignore = `
# dependencies
/node_modules

# testing
/coverage

# production
/build`;

const init = () => {
  try{
    inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: '给你的项目取个名字吧',
    }, {
      type: 'list',
      name: 'installDependencies',
      message: '是否需要自动安装依赖?',
      default: 0,
      choices: [
        { value: false, name: 'no' },
        { value: true, name: 'yes' },
      ]
    }])
    .then(async function (answers) {
      const targetPath = process.cwd() + `${answers.name}`;

      // 拷贝模板
      try {
        await download(answers.name);
        log.info('success!')
      } catch (error) {
        log.warn('warn download:', error)
      }

      // 更新package.json name
      // try {
      //   await fse.writeJson(`${targetPath}/package.json`, {
      //     name: answers.name
      //   }, {
      //     spaces: 2
      //   });
      //   log.info('项目生成完毕\n');
      // } catch (error) {
      //   log.warn('脚手架生成失败', error);
      //   process.exit(1)
      // }

      // 自动安装依赖
      try {
        if (answers.installDependencies) {
          shell.exec(`cd ${targetPath} && npm i`);
        }
        process.exit(0);
      } catch (err) {
        log.warn('依赖安装失败', err);
        process.exit(1);
      }
    })
  } catch(err) {
    console.log('init err==>>',err)
  }
}

export default init;
