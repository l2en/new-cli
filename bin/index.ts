#!/usr/bin/env node
import init from '../src/lib/init';
import * as program from 'commander';

const pkg = require('../../package.json');

program
  .version(pkg.version, '-v, --version')


program
  .command('init')
  .description('初始化你的项目')
  .action(init)

program.on('--help', function () {
  console.log('')
  console.log('  例子:')

  console.log('')
  console.log('  项目初始化')
  console.log(`    $ ${pkg.name} init`)

  console.log('')
  console.log('')
})

program.parse(process.argv)

