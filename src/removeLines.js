#!/usr/bin/env node
const fs = require('fs');
const commander = require('commander');
const readline = require('readline');
const readlineSync = require('readline-sync');
const pathScanner = require('./utils/pathScanner');
const program = new commander.Command();

program
  .name('rmline')
  .usage('-t <text> [options] file ... ')
  .requiredOption('-t, --text <text>', 'text to search')
  .option('-c, --ignore-case', 'case insensitive')
  .option('-i, --interactive', 'verify before processing each file')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

pathScanner(program.args, { appName: 'rmline' }).forEach(file => {
  // Interactive mode
  if (program.interactive) {
    const ans = readlineSync.question(`process ${file} (y/n)? `);
    if (!ans.trim().toLowerCase().startsWith('y')) return;
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(file),
  });
  const writer = fs.createWriteStream(`${file}.rmline`, { flags: 'a' }); // a for append
  let count = 0;

  rl.on('line', line => {
    new RegExp(program.text, program.ignoreCase ? 'i' : '').test(line)
      ? (count += 1)
      : writer.write(line + '\n');
  });

  rl.on('SIGINT', () => {
    rl.close();
    writer.close();
    fs.unlinkSync(`${file}.rmline`);
  });

  rl.on('close', () => {
    rl.close();
    writer.close();
    fs.unlinkSync(file);
    fs.renameSync(`${file}.rmline`, file);
    console.log(`rmline: ${file}: ${count} line(s) removed`);
  });
});
