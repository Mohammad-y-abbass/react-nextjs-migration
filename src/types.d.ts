export const nodeType = 'file' | 'folder';

export interface ASTNode {
  type: nodeType;
  name: string;
  children?: ASTNode[];
  content?: string;
}
