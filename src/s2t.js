#!/usr/bin/env node
const fs = require('fs');
const OpenCC = require('opencc');
const opencc = new OpenCC('s2twp.json');
const pathScanner = require('./utils/pathScanner');
const args = process.argv.slice(2);

if (!args.length) {
  console.log('usage: s2t <file> ...');
  return;
}

pathScanner(args, { appName: 's2t' }).forEach(file => {
  const content = fs.readFileSync(file);
  const converted = opencc.convertSync(content);

  fs.writeFile(file, converted, err => {
    if (err) console.err(`s2t: ${file}: Error writing to file`);
    else console.log(`s2t: ${file}: Converted Successfully`);
  });
});
