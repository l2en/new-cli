import ora from "ora";
import * as downloadRepo from 'download-git-repo';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from "chalk";
import log from "../utils/log";

function download(dirPath = '') {
  return new Promise((resolve, reject) => {
    const requestUrl = 'github:l2en/cli-template';
    const templateDownLoadPath = path.resolve('./tmpDir');
    const spinner = ora('downloading template...');
    spinner.start();
    
    downloadRepo(requestUrl, templateDownLoadPath, { clone: false }, (err) => {
      if (err) {
        spinner.fail(chalk.red('download template unsuccessfully \n'));
        reject('');
      } else {
        spinner.succeed(chalk.green('download template successfully \n'));
        console.log(dirPath,'<<<dirPath')
        fs.copySync(templateDownLoadPath, path.resolve(process.cwd(), dirPath));
        log.success('模板解析成功， 初始化完成 \n');
        fs.removeSync(templateDownLoadPath);
        resolve(void 0);
      }
    });
  })
}

export default download;
