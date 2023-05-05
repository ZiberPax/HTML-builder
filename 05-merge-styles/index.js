const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


fs.readdir(path.join(__dirname,`styles`),{withFileTypes: true}, (err,files) => {
  if (err) return console.error(err.message);
  let myWriteStream = fs.createWriteStream(path.join(__dirname, `project-dist`, `bundle.css`))
  files.forEach(el => {
    if (el.isFile() && path.extname(el.name) == `.css`) {
      let myReadStream = fs.createReadStream(path.join(__dirname, `styles`, `${el.name}`), {encoding: 'utf-8'});
      myReadStream.pipe(myWriteStream)
      
    }
  })
})
