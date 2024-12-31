/** @type {import('prettier').Config} */
const config = {
    semi: true, // Add semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    trailingComma: 'es5', // Add trailing commas where valid in ES5 (e.g., objects, arrays)
    printWidth: 80, // Wrap lines at 80 characters
    tabWidth: 2, // Use 2 spaces per tab
    useTabs: false, // Indent lines with spaces instead of tabs
    bracketSpacing: true, // Print spaces between brackets in object literals
    arrowParens: 'always', // Always include parentheses for arrow function arguments
    jsxSingleQuote: false, // Use double quotes in JSX
    endOfLine: 'lf', // Use LF line endings
  };
  
  module.exports = config;
  