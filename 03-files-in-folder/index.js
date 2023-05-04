const fs = require('fs');
const path = require('path');

fs.readdir("03-files-in-folder/secret-folder", {withFileTypes: true}, (err, files) => {
  if (err) return console.error(err.message)
  files.forEach(element => {
    if (element.isFile()) {
      const noExtensionsName = path.basename(`secret-folder/${element.name}`, `${path.extname(element.name)}`)
      const Extensions = path.extname(element.name).split('.')[1]
      fs.stat(path.join(__dirname, `secret-folder`,`${element.name}`), function(err, stats){
        const num = stats.size / 1024;
        const sizeOfFile = Math.floor(num * 100) / 100;
        console.log(path.basename(`${noExtensionsName} - ${Extensions} - ${sizeOfFile}kb`));
      })
    }
  })
})
