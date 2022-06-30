var fs = require('fs')
var axios = require('axios')

module.exports = {

    pwd: (done) => {
        return done(process.cwd())
    },
    date: (done) =>{
        done(Date())
    },
    ls: (done)=>{
        return fs.readdir('.', 'utf-8', function(err, files){
            if(err) throw err;
            files.forEach((file) => {
                done(file.toString() + '\n')
            })
        })
    },
    echo: (done, args) =>{ 
        done(args.join(' ')); //utilizo join para concatar mi input que es un array
    },
    cat: (done, args) =>{
        fs.readFile(args[0], 'utf-8', (err,data)=>{
            if(err) throw err;
            done(data);
        })
    },
    head: (done,args) =>{
        fs.readFile(args[0], 'utf-8', (err,data)=>{
            if(err) throw err;
            const lines =data.split('\n').slice(0, 5);
            done(lines.join('\n'));
        })
    },
    tail:(done,args) =>{
        fs.readFile(args[0], 'utf-8', (err,data)=>{
            if(err) throw err;
            const lines =data.split('\n').slice(-5);
            done(lines.join('\n'));
        })
    },
    curl: (done,args)=>{
        axios(args[0])
        .then(res =>{
            done(res.data.toString())
        })
    }
};

