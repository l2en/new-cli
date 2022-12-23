import ora from "ora";
import * as downloadRepo from 'download-git-repo';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from "chalk";
import log from "../utils/log";

function download(dirPath = '', temp_type = 'react') {
  const template_remote = {
    react: 'github:l2en/cli-template'
  };
  
  return new Promise((resolve, reject) => {
    const requestUrl = template_remote[temp_type];
    const templateDownLoadPath = path.resolve('./tmpDir');
    const spinner = ora('template downloading...');
    spinner.start();
    
    downloadRepo(requestUrl, templateDownLoadPath, { clone: false }, (err) => {
      if (err) {
        spinner.fail(chalk.red('download template unsuccessfully \n'));
        reject('');
      } else {
        spinner.succeed(chalk.green('download template successfully \n'));
        fs.copySync(templateDownLoadPath, path.resolve(process.cwd(), dirPath));
        log.order(`cd ${dirPath}  即可开始业务开发 \n`);
        fs.removeSync(templateDownLoadPath);
        resolve(void 0);
      }
    });
  })
}

export default download;
