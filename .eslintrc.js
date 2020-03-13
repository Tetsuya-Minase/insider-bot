module.exports = {
  'parser': '@typescript-eslint/parser',
  'env': {'browser': true, 'node': true, 'es6': true},
  'parserOptions': {
    'sourceType': 'module'
  },
  'plugins': ['@typescript-eslint'],
  'rules': {
    'no-eval': 'error',
    'no-empty': 'error',
    'no-template-curly-in-string': 'error',
    'no-var': 'error',
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 1}],
    'no-console': ['warn', ]
  }
};
