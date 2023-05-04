
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

function copy () {
  fs.readdir(path.join(__dirname, `files`), (err,files) => {
    if (err) return console.error(err.message);
    files.forEach(el => {
      fsPromises.copyFile(path.join(__dirname, `files`,`${el}`), path.join(__dirname, `files-copy`,`${el}`))
    })
  })
}


fs.stat(path.join(__dirname, `files-copy`), err => {
  if (!err) {
    fs.readdir(path.join(__dirname, `files-copy`), (err, files) => {
      if (err) return console.error(err.message);
      files.forEach(el => {
        fs.unlink(path.join(__dirname, `files-copy`,`${el}`), err => {
          if (err) return console.error(err.message);
        })
      })
    })
    copy ()
  }
  else if (err.code === 'ENOENT') {
    fs.promises.mkdir(path.join(__dirname, `files-copy`));
    copy ()
  }
});

