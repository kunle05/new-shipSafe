const fs = require('fs');

module.exports = () =>
  fs.readdirSync(__dirname).map((query) => {
    if (query === 'index.js') return;
    return require('./' + query);
  });
