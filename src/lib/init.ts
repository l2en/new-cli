import * as inquirer from 'inquirer';
import shell from 'shelljs';
import log from '../utils/log';
import download from './git-download.js';
import installDps from './installDps';

const init = () => {
  try {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '项目名',
        },
        {
          type: 'list',
          name: 'type',
          message: '框架类型',
          default: 0,
          choices: [
            { value: 'react', name: 'react' },
            { value: 'vue', name: 'vue [todo]', disabled: true },
          ]
        },
        // {
        //   type: 'list',
        //   name: 'installDependencies',
        //   message: '是否需要自动安装依赖?',
        //   default: 0,
        //   choices: [
        //     { value: false, name: 'no' },
        //     { value: true, name: 'yes' },
        //   ]
        // }
      ])
      .then(async function (answers) {
        const targetPath = process.cwd() + `${answers.name}`;

        // 拷贝模板
        try {
          await download(answers.name, answers.type);
          log.info('success!')
        } catch (error) {
          log.warn('warn download:', error)
        }

        // 自动安装依赖 todo
        // try {
        //   if (answers.installDependencies) {
        //     console.log('install')
        //     await installDps(targetPath);
        //   }
        //   process.exit(0);
        // } catch (err) {
        //   log.warn('依赖安装失败', err);
        //   process.exit(1);
        // }
      })
  } catch (err) {
    console.log('init err==>>', err)
  }
}

export default init;
