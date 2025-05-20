const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res) => {
    fs.readdir(`./files`,(err,files ) => {
        res.render("index.ejs",{files : files});
    })
})

//Home route
app.get("/file/:filename",(req,res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data) => { //files directory mein read krvana h vo particular txt file
        console.log(data);
        res.render("show.ejs",{filename:req.params.filename , data:data});
    })
});

//create route
app.post("/create",(req,res) => {
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err) {
        res.redirect("/");
    });
});

//edit route
app.get("/edit/:filename",(req,res) => {
    res.render("edit.ejs",{filename:req.params.filename});
});

//update route
app.post("/edit",async(req,res) => {
    console.log(req.body);
        fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err) => {
        res.redirect("/");
    });
});


app.listen(8080,() => {
    console.log("Server running");
});