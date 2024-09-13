import fs from 'fs';
import { parse } from './parser.js';
import chalk from 'chalk';

console.log(
  chalk.magenta('Parsing your React project and generating project tree...')
);

const ast = parse('../projects/mo-platform/frontend');

fs.writeFileSync('ast.json', JSON.stringify(ast, null, 2));
