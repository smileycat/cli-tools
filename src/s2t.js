#!/usr/bin/env node
const fs = require('fs');
const commander = require('commander');
const readline = require('readline-sync');
const OpenCC = require('opencc');
const pathScanner = require('./utils/pathScanner');

const opencc = new OpenCC('s2twp.json');
const program = new commander.Command();

program
  .name('s2t')
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

  try {
    fs.writeFileSync(file, converted);
    console.log(`s2t: ${file}: Converted Successfully`);
  } catch (err) {
    console.err(`s2t: ${file}: ${err}`);
  }
});
