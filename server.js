'use strict';
const DNS=require("dns");
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser=require("body-parser");    
const urlencodedParser=bodyParser.urlencoded({extended: false});

mongoose.connect("mongodb+srv://sagarsoni:nopassword123@cluster0-onc9h.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true})

const urlDB=mongoose.model("myurl",{originalURL: String});



var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new",urlencodedParser,(req,res)=>{
  let inputURL=req.body.url;
  const REPLACE_REGEX = /^https?:\/\//i
  let parsedInputURL=inputURL.replace(REPLACE_REGEX,"");

  DNS.lookup(parsedInputURL,(err,address,family)=>{
    if(err){
      res.json({"error":"invalid URL"})
    }else{
      const newurl= new urlDB({originalURL:parsedInputURL});
      newurl.save((err,savedItem)=>{
      res.json({
      original_url:parsedInputURL,
      short_url:req.header("Host")+"/api/shorturl/"+savedItem.id
    });
   })
  }
  })   
});

app.get("/api/shorturl/:shortURL",(req,res)=>{
  urlDB.findById(req.params.shortURL, (err,result)=>{
    if(err) throw err;
    res.redirect("http://"+result.originalURL)
  })
  
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});