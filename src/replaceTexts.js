#!/usr/bin/env node
const readline = require('readline-sync');
const fs = require('fs');
const files = process.argv.slice(2);

if (!files.length) {
  console.log('usage: replace-texts <file> ...');
  return;
}

// Getting user inputs
const search = readline.question('text: ', { keepWhitespace: true });
const replacement = readline.question('new text: ', { keepWhitespace: true });
console.log();

// Processing through each provided file
files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`replace-texts: ${file}: No such file or directory`);
    return;
  }

  let data = fs.readFileSync(file, 'utf-8');
  let count = (data.match(new RegExp(search, 'g')) || []).length;
  data = data.replace(new RegExp(search, 'g'), replacement);

  if (count === 0) {
    console.log(`replace-texts: ${file}: 0 changes`);
    return;
  }

  fs.writeFile(file, data, 'utf-8', err => {
    if (err) console.err(`replace-texts: ${file}: Error writing to file`);
    else console.log(`replace-texts: ${file}: ${count} changes`);
  });
});
