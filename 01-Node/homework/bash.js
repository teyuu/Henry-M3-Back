/*
  Lista de comandos
------------------------
  pwd -> imprime el directorio
  date -> imprime la fecha actual
  ls -> lista todos los archivos del directorio
  echo -> me devuelve lo mismo que ingreso
  cat -> devolver todo el contenido de un archivo
  head -> devuelve las primeras lineas de un archivo
  tail -> devuelve las ultimas lineas de un archivo
  curl -> mostrar el contenido de una página
*/

const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');

// El evento stdin 'data' se dispara cuando el user escribe una línea

process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); // remueve la nueva línea
  var cdm = args.shift();

  function write(data){
    process.stdout.write(data);

    process.stdout.write('\nprompt > ');
  }
  if(!commands[cdm]){write('Comando no válido')}
  else{commands[cdm](write, args)}
  
});