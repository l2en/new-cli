import ora from "ora";
import shell from 'shelljs';
import chalk from "chalk";

const installDps = (dir = '') => {
  console.log('staring')
  return new Promise((resolve, reject) => {
    const spinner = ora('dependencies installing...');
    spinner.start();

    shell.cd(dir);
    if(shell.exec(`npm i`).code !== 0) {
      reject(void 0);
    } else {
      spinner.succeed(chalk.green('依赖安装完成 \n'));
      resolve(void 0);
    }
  })
}

export default installDps;
