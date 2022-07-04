var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer((req, res) => {

        
  fs.readFile(`./images${req.url}.jpg`, (err, data)=>{ 
    if(data){
        res.writeHead(200, {'Content-Type' : 'image/jpeg'}) 
        res.end(data)
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        return res.end('No se encontro la imagen')
    }
  })  
}).listen(3000)
