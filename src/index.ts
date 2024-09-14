import fs from 'fs';
import { parse } from './parser.js';
import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';

async function main() {
  try {
    const isUsingTs = await confirm({ message: 'Are you using typescript?' });
    const isUsingTailwind = await confirm({
      message: 'Are you using tailwind?',
    });

    console.log(
      chalk.magenta('Parsing your React project and generating project tree...')
    );

    const ast = parse('../projects/mo-platform');


    fs.writeFileSync('project.json', JSON.stringify(ast, null, 2));
    console.log(chalk.green('Project tree has been successfully generated!'));
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
}

main();
