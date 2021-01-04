const fs = require('fs');
const glob = require('glob');

function pathScanner(inputs, options = {}) {
  const prefix = options.appName ? `${options.appName}: ` : '';

  return inputs.reduce((all, path) => {
    // Check if it's a directory
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      console.log(`${prefix + path}: is a directory`);
      return all;
    }

    const files = glob.sync(path);
    if (files.length === 0) {
      console.log(`${prefix + path}: no such file or directory`);
    }
    return all.concat(files);
  }, []);
}

module.exports = pathScanner;
