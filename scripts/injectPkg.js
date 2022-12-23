const fs = require('fs-extra');
const path = require('path');

;(function() {
  if(fs.pathExistsSync(path.resolve(__dirname, '..', 'build'))) {
    const pkg = fs.readFileSync(path.resolve(__dirname, '../.packagerc'), 'utf-8');
    fs.writeFileSync(path.resolve(__dirname, '../build/package.json'), pkg, 'utf-8');
  }
})();
