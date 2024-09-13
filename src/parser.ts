import fs from 'fs';
import { ASTNode } from './types';
import { checkIfFileIgnored } from './utils';

export function parse(project_path: string): ASTNode[] {
  //read from files and folders in the project
  const nodes = fs.readdirSync(project_path, { withFileTypes: true });

  let projectAst: ASTNode[] = [];

  //loop over the  files and folders in the project
  for (const node of nodes) {
    //check if the file or folder should be ignored like node_modules or package-lock.json
    if (checkIfFileIgnored(node.name)) {
      continue;
    }

    // create  a full path to the file or folder
    const fullPath = `${project_path}/${node.name}`;

    // check if the node is a folder to parse the child nodes using recursion
    if (node.isDirectory()) {
      projectAst.push({
        type: 'folder',
        name: node.name,
        children: parse(fullPath),
      });
    }

    // check is the node is a file
    if (node.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      projectAst.push({
        type: 'file',
        name: node.name,
        content: content,
      });
    }
  }
  return projectAst;
}
