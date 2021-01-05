#!/usr/bin/env node
const fs = require('fs');
const commander = require('commander');
const readline = require('readline-sync');
const pathScanner = require('./utils/pathScanner');
const program = new commander.Command();

program
  .name('rptxt')
  .usage('[options] file ...')
  .option('-i, --interactive', 'verify before processing each file')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

// Getting user inputs
const search = readline.question('text: ', { keepWhitespace: true });
const replacement = readline.question('new text: ', { keepWhitespace: true });
console.log();

// Processing through each provided file
pathScanner(args, { appName: 'rptxt' }).forEach(file => {
  // Interactive mode
  if (program.interactive) {
    const ans = readline.question(`process ${file} (y/n)? `);
    if (!ans.trim().toLowerCase().startsWith('y')) return;
  }

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
