#!/usr/bin/env node
const package = require('../package.json');
const commands = [
  {
    name: 's2t',
    description: 'Convert text files from simplified chinese to traditional chinese',
  },
  {
    name: 'rptxt',
    description: 'Replaces all occurrences in the text files with user specified text',
  },
];

console.log(`\n\u250c${'\u2500'.repeat(18)}\u2510`);
console.log(`\u2502 CLI Tools v${package.version} \u2502`);
console.log(`\u2514${'\u2500'.repeat(18)}\u2518`);

commands.forEach(({ name, description }) => {
  console.log(name.padEnd(15) + description);
});

console.log();
