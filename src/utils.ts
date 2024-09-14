import { exec } from 'child_process';

// list of files and folders the parser should ignore
const ignoredNodes = [
  'node_modules',
  '.git',
  '.vscode',
  'package-lock.json',
  'dist',
  'build',
  'main.jsx',
  'main.js',
  'main.tsx',
  'main.ts',
  'index.html',
];

// cheeck if the file or folder is on the ignore list and return true or false
export function checkIfNodeIsIgnored(fileName: string): boolean {
  return ignoredNodes.includes(fileName);
}

