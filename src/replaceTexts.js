#!/usr/bin/env node
const path = require('path');
const readline = require('readline-sync');
const fs = require('fs');

function instruction() {
  const divider = '=========================================================================';
  console.log(divider);
  console.log('This tool will modify all files of the specified file types (e.g. ".txt")');
  console.log('in the current directory. Replaces all occurences of the matched texts');
  console.log('with the new texts.\n');
  console.log('NOTE: only enter ONE file type!');
  console.log(divider);
}

function process() {
  const fileExt = readline.question('Enter file type: ');
  const search = readline.question('Enter text: ', { keepWhitespace: true });
  const replacement = readline.question('Enter new text: ', { keepWhitespace: true });
  console.log();

  // Read all files in current directory.
  fs.readdirSync('./', 'utf-8')
    .filter(file => path.extname(file) === fileExt)
    .forEach(file => {
      let data = fs.readFileSync(file, 'utf-8');
      let count = (data.match(new RegExp(search, 'g')) || []).length;
      data = data.replace(new RegExp(search, 'g'), replacement);

      if (count === 0) {
        console.log(`${file} - no changes.`);
        return;
      }

      fs.writeFile(file, data, 'utf-8', err => {
        if (err) console.err(`${file} - error`);

        console.log(`${file} - ${count} changes.`);
      });
    });
}

instruction();
process();
