// list of files and folders the parser should ignore
const ignoredFiles = [
  'node_modules',
  '.git',
  '.vscode',
  'package-lock.json',
  'package.json',
];

// cheeck if the file or folder is on the ignore list and return true or false
export function checkIfFileIgnored(fileName: string): boolean {
  return ignoredFiles.includes(fileName);
}
