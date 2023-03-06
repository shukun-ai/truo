export const ECMA_VERSION = 11;

/* Indicates the mode the code should be parsed in. 
This influences global strict mode and parsing of import and export declarations.
*/
export enum SourceType {
  script = 'script',
  module = 'module',
}

// Each node has an attached type property which further defines
// what all properties can the node have.
// We will just define the ones we are working with
export enum NodeTypes {
  Identifier = 'Identifier',
  AssignmentPattern = 'AssignmentPattern',
  Literal = 'Literal',
  Property = 'Property',
  // Declaration - https://github.com/estree/estree/blob/master/es5.md#declarations
  FunctionDeclaration = 'FunctionDeclaration',
  ExportDefaultDeclaration = 'ExportDefaultDeclaration',
  VariableDeclarator = 'VariableDeclarator',
  // Expression - https://github.com/estree/estree/blob/master/es5.md#expressions
  MemberExpression = 'MemberExpression',
  FunctionExpression = 'FunctionExpression',
  ArrowFunctionExpression = 'ArrowFunctionExpression',
  ObjectExpression = 'ObjectExpression',
  ArrayExpression = 'ArrayExpression',
  ThisExpression = 'ThisExpression',
}

/*
 * Valuable links:
 *
 * * ESTree spec: Javascript AST is called ESTree.
 * Each es version has its md file in the repo to find features
 * implemented and their node type
 * https://github.com/estree/estree
 *
 * * Acorn: The parser we use to get the AST
 * https://github.com/acornjs/acorn
 *
 * * Acorn walk: The walker we use to traverse the AST
 * https://github.com/acornjs/acorn/tree/master/acorn-walk
 *
 * * AST Explorer: Helpful web tool to see ASTs and its parts
 * https://astexplorer.net/
 *
 */

export type Pattern = IdentifierNode | AssignmentPatternNode;
export type Expression = Node;
// doc: https://github.com/estree/estree/blob/master/es5.md#memberexpression
export interface MemberExpressionNode extends Node {
  type: NodeTypes.MemberExpression;
  object: MemberExpressionNode | IdentifierNode;
  property: IdentifierNode | LiteralNode;
  computed: boolean;
  // doc: https://github.com/estree/estree/blob/master/es2020.md#chainexpression
  optional?: boolean;
}

// doc: https://github.com/estree/estree/blob/master/es5.md#identifier
export interface IdentifierNode extends Node {
  type: NodeTypes.Identifier;
  name: string;
}

//Using this to handle the Variable property refactor
export interface RefactorIdentifierNode extends Node {
  type: NodeTypes.Identifier;
  name: string;
  property?: IdentifierNode;
}

// doc: https://github.com/estree/estree/blob/master/es5.md#variabledeclarator
export interface VariableDeclaratorNode extends Node {
  type: NodeTypes.VariableDeclarator;
  id: IdentifierNode;
  init: Expression | null;
}

// doc: https://github.com/estree/estree/blob/master/es5.md#functions
export interface Function extends Node {
  id: IdentifierNode | null;
  params: Pattern[];
}

// doc: https://github.com/estree/estree/blob/master/es5.md#functiondeclaration
export interface FunctionDeclarationNode extends Node, Function {
  type: NodeTypes.FunctionDeclaration;
}

// doc: https://github.com/estree/estree/blob/master/es5.md#functionexpression
export interface FunctionExpressionNode extends Expression, Function {
  type: NodeTypes.FunctionExpression;
}

export interface ArrowFunctionExpressionNode extends Expression, Function {
  type: NodeTypes.ArrowFunctionExpression;
}

export interface ObjectExpression extends Expression {
  type: NodeTypes.ObjectExpression;
  properties: Array<PropertyNode>;
}

// doc: https://github.com/estree/estree/blob/master/es2015.md#assignmentpattern
export interface AssignmentPatternNode extends Node {
  type: NodeTypes.AssignmentPattern;
  left: Pattern;
}

// doc: https://github.com/estree/estree/blob/master/es5.md#literal
export interface LiteralNode extends Node {
  type: NodeTypes.Literal;
  value: string | boolean | null | number | RegExp;
}

// type NodeList = {
//   references: Set<string>;
//   functionalParams: Set<string>;
//   variableDeclarations: Set<string>;
//   identifierList: Array<IdentifierNode>;
// };

// https://github.com/estree/estree/blob/master/es5.md#property
export interface PropertyNode extends Node {
  type: NodeTypes.Property;
  key: LiteralNode | IdentifierNode;
  value: Node;
  kind: 'init' | 'get' | 'set';
}

// // Node with location details
// type NodeWithLocation<NodeType> = NodeType & {
//   loc: SourceLocation;
// };

// type AstOptions = Omit<Options, "ecmaVersion">;

// type EntityRefactorResponse = {
//   isSuccess: boolean;
//   body: { script: string; refactorCount: number } | { error: string };
// };
