#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

const { Command } = commander;
const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
    return result;
  });

program.parse(process.argv);
