var fs = require('fs-extra');
var path = require('path');

function fixIndexFileWithDataDirectory(indexHtml, callback) {
  var dataDirectory = path.resolve(indexHtml, '../data');
  console.log('data dir = ' + dataDirectory);
  fs.readdir(dataDirectory, function (err, fileList) {
    if (err) {
      return callback(err);
    }

    var cssFiles = fileList.filter(function (name) {
      return /^slide\d+\.css$/.test(name);
    }).map(function (name) {
      return {
        number : /slide(\d+)\.css/.exec(name)[1],
        html : '<link rel="stylesheet" type="text/css" href="data/' + name + '">'
      };
    }).sort(function (a, b) {
      return a.number - b.number;
    }).map(function (x) {
      return x.html;
    });
    var jsFiles = fileList.filter(function (name) {
      return /^slide\d+\.js$/.test(name);
    }).map(function (name) {
      return {
        number : /slide(\d+)\.js/.exec(name)[1],
        html : '<script type="text/javascript" charset="UTF-8" src="data/' + name + '"></script>'
      };
    }).sort(function (a, b) {
      return a.number - b.number;
    }).map(function (x) {
      return x.html;
    });

    fs.readFile(indexHtml, function (err, buffer) {
      if (err) {
        return callback(err);
      }

      var data = buffer.toString();
      cssFiles = cssFiles.filter(function (html) {
        return data.indexOf(html) == -1;
      });
      jsFiles = jsFiles.filter(function (html) {
        return data.indexOf(html) == -1;
      });
      data = data.replace(/<\/head>/, cssFiles.join("\n") + '</head>');
      data = data.replace(/<\/body>/, jsFiles.join("\n") + '</body>');

      callback(null, data);
    });
  });
}

function replaceIndex(indexHtml, callback) {
  fixIndexFileWithDataDirectory(indexHtml, function (err, data) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(indexHtml, data, 'UTF-8', callback);
  });
}

module.exports = {
  createNewIndexFile : fixIndexFileWithDataDirectory,
  fixIndexFile : replaceIndex
};
