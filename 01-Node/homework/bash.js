
const commands = require('./commands');


// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  
  function write(data){
    process.stdout.write(data);

    process.stdout.write('\nprompt > ');
  }

  commands[cmd](write)
  
});