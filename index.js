//librerias
const express = require('express');
const server = express();
const path = require("path");
const rd = require("fs");
const validurl = require("valid-url");
var os = require("os");


//configuracion de librerias
server.use(express.urlencoded({ extended:true}));
server.use(express.json());
server.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
server.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
server.use(express.static(path.join(__dirname,"/src")))
server.use(express.static(path.join(__dirname,"/src/view")))

//variables del sistema
server.set("port", process.env.PORT | 600);
server.set("dns","http://localhost:"+server.get("port"))


//events



//util
var dict ={}
var data = "abcdrfghijklmnopqrstuvwxzyABCDRFGHIJKLMNOPQRSTUVWXZY" 
var generatorkey = (size) =>{
    key = ""
    for (let index = 0; index < size; index++) {
        key += data[Math.floor(Math.random()*data.length)]
    }
    return key;
};

// routes

server.post("/submit",(req,res,next) =>{
   
    console.log(req.body)
    if(validurl.isUri(req.body.url))
    {
        var key = generatorkey(8);
        dict[key] = req.body.url
        res.json({
            status:200,
            message:server.get("dns")+ "/" + key
        });
    }
    else
    {
        res.json({
            status:400,
            message:"Type correct url!"
        });
    }
   
});

server.get('/:key?',(req,res)=>{
    if(dict[req.params.key] !== undefined)
    {
        res.redirect(dict[req.params.key])
    }
    else 
    {
        res.sendfile("view/index");
    }
       
    
});

server.listen(server.get("port"),()=>{
    console.log("Server On http://localhost:"+server.get("port"));
    
});