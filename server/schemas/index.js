const fs = require('fs');

module.exports = () =>
  fs.readdirSync(__dirname).map((schema) => {
    if (schema === 'index.js') return;
    return require('./' + schema);
  });
