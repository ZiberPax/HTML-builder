const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
let myArr = []

const funcRead = async () => {
  return new Promise((resolve, rejects) => fs.readFile(path.join(__dirname, `template.html`), 'utf8', (err, data) => {
    if (err) throw err
    myArr.push(data)
    resolve(myArr)
  })

  )
}

funcRead(path.join(__dirname, `template.html`)).then((gdfgd) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `components`, 'header.html'), 'utf8', (errorHeader, fileContentHeader) => {
      gdfgd = gdfgd.join().replace(/\{\{header\}\}/, fileContentHeader).split();
      resolve(gdfgd)
    })
  })
}).then((data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `components`, 'footer.html'), 'utf8', (errorHeader, fileContentHeader) => {
      data = data.join().replace(/\{\{footer\}\}/, fileContentHeader).split();
      resolve(data)
    })
  })
}).then((data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `components`, 'articles.html'), 'utf8', (errorHeader, fileContentHeader) => {
      data = data.join().replace(/\{\{articles\}\}/, fileContentHeader).split();
      resolve(data)
    })

  })
}).then(data => {
  return new Promise((resolve, reject) => {
    fs.access(path.join(__dirname, `components`, `about.html`), fs.F_OK, (err) => {
      if (err) {
        console.error('Файла about.html не обнаружено')
        fs.access(path.join(__dirname, `project-dist`, `assets`, `img`,'squirrel-2.jpg'), fs.F_OK, (err) => {
          if (err) {
            console.log(`Файла squirrel-2.jpg не обнаружено`);
            return
          } 
          fs.unlink(path.join(__dirname, `project-dist`, `assets`, `img`,'squirrel-2.jpg'), err => {
            if(err) throw err; // не удалось удалить файл
            console.log('Файл c белкй успешно удалён');
         });
        })
        fs.access(path.join(__dirname, `project-dist`, `styles`, 'about.css'), fs.F_OK, (err) => {
          if (err) {
            console.log(`Файла about.css не обнаружено`);
            return
          }
          fs.unlink(path.join(__dirname, `project-dist`, `styles`, 'about.css'), err => {
            if(err) throw err; // не удалось удалить файл
            console.log('Файл about.css успешно удалён');
         });
        })

        resolve(data) 
      }

    
      fs.readFile(path.join(__dirname, `components`, 'about.html'), 'utf8', (errorHeader, fileContentHeader) => {
        data = data.join().replace(/\{\{about\}\}/, fileContentHeader).split();
        resolve(data) 
      })
    })

  })
}).then((data) => {
  // console.log(data.join())

  fs.stat(path.join(__dirname, `project-dist`), err => {
    if (!err) {
      console.log(`Папка project-dist уже есть`);
      fs.stat(path.join(__dirname, `project-dist`, 'assets'), err => {
        if (!err) {
          console.log(`Папка assets уже есть`);
        } else if (err.code === "ENOENT") {
          console.log(`Создаю папку project-dist`);
          fs.promises.mkdir(path.join(__dirname, `project-dist`, 'assets'));
        }
      })

      fs.writeFile(path.join(__dirname, `project-dist`, `index.html`), data.join(), (err) => {
        if (err) throw err;
        console.log('Data has been replaced!');
      });

    } else if (err.code === "ENOENT") {
      console.log(`Создаю папку project-dist`);

      fs.promises.mkdir(path.join(__dirname, `project-dist`));

      fs.stat(path.join(__dirname, `project-dist`, 'assets'), err => {
        if (!err) {
          console.log(`Папка assets уже есть`);
        } else if (err.code === "ENOENT") {
          console.log(`Создаю папку assets`);
          fs.promises.mkdir(path.join(__dirname, `project-dist`, 'assets'));
        }
      });

      fs.writeFile(path.join(__dirname, `project-dist`, `index.html`), data.join(), (err) => {
        if (err) throw err;
        console.log('Data has been replaced!');
      });
    }

  });

  fs.readdir(path.join(__dirname, `styles`), { withFileTypes: true }, (err, files) => {
    if (err) return console.error(err.message);
    let myWriteStream = fs.createWriteStream(path.join(__dirname, `project-dist`, `style.css`))
    files.forEach(el => {
      if (el.isFile() && path.extname(el.name) == `.css`) {
        let myReadStream = fs.createReadStream(path.join(__dirname, `styles`, `${el.name}`), { encoding: 'utf-8' });
        myReadStream.pipe(myWriteStream)
      }
    })
  });

  copy((path.join(__dirname, `assets`)), (path.join(__dirname, `project-dist`, `assets`)))

  return data
})


function copy(startFolder, secondFolder) {
  fs.readdir(startFolder, (err, files) => {
    if (err) return console.error(err.message);
    files.forEach(el => {
      if (path.extname(el) == '') {
        fs.stat(path.join(secondFolder, `${el}`), err => {
          // console.log(path.join(secondFolder, `${el}`));
          if (!err) {
          } else if (err.code === "ENOENT") {
            fs.promises.mkdir((path.join(secondFolder, `${el}`)));
          }
        })
        fs.readdir(path.join(startFolder, `${el}`), (err, files) => {
          // console.log(files.length);

          files.forEach(element => {

            fs.access(path.join(__dirname, `project-dist`, `assets`, el, element), fs.F_OK,  (err) => {
              if (!err) {
                fs.unlink(path.join(__dirname, `project-dist`, `assets`, el, element), async err => {
                  if (err) {
                    return
                  } // не удалось удалить файл
                  console.log('Файл успешно удалён');
                  await fsPromises.copyFile(path.join(startFolder, el, `${element}`), path.join(secondFolder, el, `${element}`))
                });
              }
            })

            
            fs.stat(path.join(secondFolder, `${el}`), err => {
              if (!err) {
                fsPromises.copyFile(path.join(startFolder, el, `${element}`), path.join(secondFolder, el, `${element}`))
              } else if (err.code === 'ENOENT') {
                fsPromises.copyFile(path.join(startFolder, el, `${element}`), path.join(secondFolder, el, `${element}`))
              }
            }); 
            
          });
        })
      }
    })
  })
}