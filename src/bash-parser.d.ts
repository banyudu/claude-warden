declare module 'bash-parser' {
  interface AstNode {
    type: string;
    [key: string]: unknown;
  }

  function parse(input: string): AstNode;
  export default parse;
}
