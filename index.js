var iSpringWorkaround = require('./iSpringWorkaround');

var index = process.argv[2];

if (!index) {
  throw new Error('index.html must be defined!');
}

iSpringWorkaround.fixIndexFile(index, function (err) {
  if (err) {
    console.error('Error trying to fix index file: ', err);
    throw err;
  }

  console.log('Done fixing index file.');
});
