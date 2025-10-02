// import moduleAlias from 'module-alias';
// import { fileURLToPath } from 'url';
// import { dirname, resolve } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Register aliases
// moduleAlias.addAliases({
//   '@': resolve(__dirname, '../'),
//   '@test': resolve(__dirname, '../test'),
//   '@dao': resolve(__dirname, '../lib/dao'),
//   '@controllers': resolve(__dirname, '../lib/controllers')
// });

// Test setup
process.env.NODE_ENV = 'test';
console.log('Test environment initialized');