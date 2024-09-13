import fs from 'fs';
import path from 'path'; // Import path module to handle file paths
import { ASTNode } from './types.js';
import { checkIfNodeIsIgnored } from './utils.js';
import chalk from 'chalk';

export function parse(project_path: string): ASTNode[] {
  let projectAst: ASTNode[] = [];

  try {
    // Check if the path exists before proceeding
    if (!fs.existsSync(project_path)) {
      console.error(
        chalk.red(`Error: The path "${project_path}" does not exist.`)
      );
      return [];
    }

    // Read files and folders in the project
    const nodes = fs.readdirSync(project_path, { withFileTypes: true });

    // Loop over the files and folders in the project
    for (const node of nodes) {
      // Check if the file or folder should be ignored
      if (checkIfNodeIsIgnored(node.name)) {
        continue;
      }

      // Create a full path to the file or folder
      const fullPath = path.resolve(project_path, node.name); // Use path.resolve for cross-platform compatibility

      try {
        // Check if the node is a folder
        if (node.isDirectory()) {
          projectAst.push({
            type: 'folder',
            name: node.name,
            children: parse(fullPath),
          });
        }

        // Check if the node is a file
        if (node.isFile()) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          projectAst.push({
            type: 'file',
            name: node.name,
            content: content,
          });
        }
      } catch (err) {
        console.error(chalk.red(`Error processing "${fullPath}": ${err}`));
      }
    }
  } catch (err) {
    console.error(
      chalk.red(`Error reading directory "${project_path}": ${err}`)
    );
  }

  return projectAst;
}
