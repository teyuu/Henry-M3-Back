var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

/*
1.Crea la ruta "/api" que muestre el arreglo completo (done)

2.Ahora en la ruta "/api/John%20Lennon" deberiamos ver solo el objeto de John (done)

3.Haz lo mismo con los otros beatles. Podemos hacer esto sin repetirnos en una misma ruta? (done)

4. Si el usuario no entra un Beatle valido tiene que darle un error diciendo que la página no se encontro */

http.createServer((req, res) =>{
  
  if(req.url === '/api'){
    res.writeHead(200, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(beatles))
  }
  if(req.url.slice(0,5) ==='/api/'){
    const search = req.url.split('/').pop();    // [John%20Lennon]
    const beatle = beatles.find(b => b.name.replace(' ', '%20') === search);
    
    if(beatle){
      res.writeHead(200, {'Content-Type': 'application/json'})
      return res.end(JSON.stringify(beatle))
    }else{

      res.writeHead(404, {'Content-Type': 'text/plain'})
      return res.end('No se encontro el beatle')
    }
  }
  
  //Punto 2 TemplateHtml
  if(req.url.length > 1){
    const search = req.url.split('/').pop(); 
    const beatle = beatles.find(b => b.name.replace(' ', '%20') === search)

    if(beatle){
      fs.readFile('./beatle.html', 'utf-8', (err, data)=>{
        if(err){
          res.writeHead(404, {'Content-Type': 'text/plain'})
          return res.end('No se encontro el beatle')
        }
        else{
          data = data.replace('{name}', beatle.name);
          data = data.replace('{birthdate}', beatle.birthdate);
          data = data.replace('{profilePic}', beatle.profilePic);
          res.writeHead(200, {'Content-Type': 'text/html'})
          return res.end(data)
        }
      })
    }
  }

}).listen(3000)
