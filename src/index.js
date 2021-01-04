#!/usr/bin/env node
const box = require('./utils/boxDrawer');
const package = require('../package.json');
const commands = [
  {
    name: 's2t',
    description: 'Convert text files from simplified chinese to traditional chinese',
  },
  {
    name: 'rptxt',
    description: 'Replace all occurrences in the text files with user specified text',
  },
];

box.draw(`${package.name} v${package.version}`, { padding: '0 15', style: 'bold' });

const spacing = commands.reduce((max, { name }) => (name.length > max ? name.length : max), 0) + 2;
commands.forEach(({ name, description }) => {
  console.log(name.padEnd(spacing) + description);
});

console.log();
