const fs = require('fs');
const glob = require('glob');

function pathScanner(inputs, options = {}) {
  const { appName } = options;

  return inputs.reduce((all, path) => {
    // Check if it's a directory
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      console.log(`${appName ? appName + ': ' : ''}${path}: is a directory`);
      return all;
    }

    const files = glob.sync(path);
    if (files.length === 0) {
      console.log(`${appName ? appName + ': ' : ''}${path}: No such file or directory`);
    }
    return all.concat(files);
  }, []);
}

module.exports = pathScanner;

// glob(path, {}, (err, files) => {
//   if (err) {
//     console.error(`Error reading path: ${path}`);
//     return all;
//   } else {
//     console.log(all.concat(files));
//     return all.concat(files);
//   }
// }),
