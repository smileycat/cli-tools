#!/usr/bin/env node
const fs = require('fs');
const commander = require('commander');
const readline = require('readline-sync');
const OpenCC = require('opencc');
const pathScanner = require('./utils/pathScanner');

const opencc = new OpenCC('s2twp.json');
const program = new commander.Command();

program
  .usage('[options] file ...')
  .option('-i, --interactive', 'verify before processing each file')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

pathScanner(program.args, { appName: 's2t' }).forEach(file => {
  // Interactive mode
  if (program.interactive) {
    const ans = readline.question(`process ${file} (y/n)? `);
    if (!ans.trim().toLowerCase().startsWith('y')) return;
  }
  const content = fs.readFileSync(file);
  const converted = opencc.convertSync(content);

  fs.writeFile(file, converted, err => {
    if (err) console.err(`s2t: ${file}: Error writing to file`);
    else console.log(`s2t: ${file}: Converted Successfully`);
  });
});
