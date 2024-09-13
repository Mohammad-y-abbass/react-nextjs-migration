import fs from 'fs';
import { parse } from './parser';

const ast = parse('../projects/mo-platform');

fs.writeFileSync('ast.json', JSON.stringify(ast, null, 2));
