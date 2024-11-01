const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const { styleText } = require("util")

const templatePath=path.join(__dirname,'../Templates')

app.use(express.static('public'))
app.use(express.static(path.join(__dirname,"public")))

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))
app.use("/bootstrap",express.static(__dirname+"/node_modules/bootstrap/dist"))



app.get("/",(req,res)=>{
    res.render("home.hbs")
})
app.get("/forum",(req,res)=>{
    res.render("forum.hbs")
})
app.get("/login",(req,res)=>{
    res.render("login.hbs")
})
app.get("/signup",(req,res)=>{
    res.render("signup.hbs")
})
app.get("/tutors",(req,res)=>{
    res.render("tutors.hbs")
})


app.post("/login",async (req,res)=>{

    try{
        const check=await collection.findOne({loginEmail:req.body.loginEmail})

        if(check.loginPassword===req.body.loginPassword){
            res.render("home")
            console.log("logged in");
        }
        else{
            res.send("Wrong password")
        }
    }
    catch{
        res.send("Wrong email")
    }


})

app.post("/signup",async (req,res)=>{

    const data={
        loginName:req.body.signupName,
        loginEmail:req.body.signupEmail,
        loginPassword:req.body.signupPassword
    }

    await collection.insertMany([data])

    res.render("home")

})





app.listen(3000,()=>{
    console.log("port connected");
})