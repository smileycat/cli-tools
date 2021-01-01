#!/usr/bin/env node
const package = require('../package.json');
const commands = [
  {
    name: 's2t',
    description: 'Translates Simplified Chinese to Traditional Chinese',
  },
  {
    name: 'replaceTexts',
    description: 'Replaces text contents of the specified text files',
  },
];

console.log(`\n\u250c${'\u2500'.repeat(18)}\u2510`);
console.log(`\u2502 CLI Tools v${package.version} \u2502`);
console.log(`\u2514${'\u2500'.repeat(18)}\u2518`);

commands.forEach(({ name, description }) => {
  console.log(name.padEnd(20) + description);
});

console.log();
