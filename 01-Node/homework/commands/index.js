function pwd(done){
    done(process.cwd())
}

function date(done){
    done(Date());  
}

module.exports = {
    pwd,
    date,
};

