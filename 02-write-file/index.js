const path = require('path');
const fs = require('fs');
  const {stdin, stdout} = process; 

fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello there! Write something (`exit` or `ctrl + c` for stop): \n')

stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {process.exit()}
  fs.appendFile(path.join(__dirname, 'text.txt'), `${data}` , error => {
    if (error) throw error;
  })
});

process.on('exit', () => stdout.write('Programm finished. Good luck and have fun!'));
process.on('SIGINT', () => {process.exit();});


