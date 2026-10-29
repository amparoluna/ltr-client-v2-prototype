// Ambient declaration for Vite's `?raw` import suffix (used to read source CSS
// files as plain strings for the live token showcase). `vite/client` isn't a
// direct dependency of this package, so the pattern is declared locally.
declare module '*.css?raw' {
  const content: string;
  export default content;
}
