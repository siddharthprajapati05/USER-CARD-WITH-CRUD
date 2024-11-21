const express =  require("express");
const app =express();
const PORT = 3000;
const path = require("path");
const usermodel= require('./models/user');


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("html")
})
app.get("/read",async(req,res)=>{
    let users = await usermodel.find()
    res.render("read",{users})
})
app.post('/create',async (req,res)=>{
    let {name,email,image}=req.body;
    let createdusers = await usermodel.create({
    name,
    email,
    image,
        })
res.redirect("/read");
})
app.get("/delete/:id",async(req,res)=>{
    let users = await usermodel.findOneAndDelete({_id:req.params.id})
    res.redirect("/read")
})

app.get("/edit/:userid",async(req,res)=>{
    let user = await usermodel.findOne({_id:req.params.userid});
    res.render("edit",{user});
})

app.post("/update/:userid",async(req,res)=>{
    let{image,name,email}=req.body;
    let users = await usermodel.findOneAndUpdate({_id:req.params.userid},{image,name,email},{new:true});
    res.redirect("/read");
})
app.listen(PORT)