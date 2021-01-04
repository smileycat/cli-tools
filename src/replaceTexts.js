#!/usr/bin/env node
const readline = require('readline-sync');
const fs = require('fs');
const pathScanner = require('./utils/pathScanner');
const args = process.argv.slice(2);

if (!args.length) {
  console.log('usage: rptxt <file> ...');
  return;
}

// Getting user inputs
const search = readline.question('text: ', { keepWhitespace: true });
const replacement = readline.question('new text: ', { keepWhitespace: true });
console.log();

// Processing through each provided file
pathScanner(args, { appName: 'rptxt' }).forEach(file => {
  let data = fs.readFileSync(file, 'utf-8');
  let count = (data.match(new RegExp(search, 'g')) || []).length;
  data = data.replace(new RegExp(search, 'g'), replacement);

  if (count === 0) {
    console.log(`rptxt: ${file}: 0 changes`);
    return;
  }

  fs.writeFile(file, data, 'utf-8', err => {
    if (err) console.err(`rptxt: ${file}: Error writing to file`);
    else console.log(`rptxt: ${file}: ${count} changes`);
  });
});
