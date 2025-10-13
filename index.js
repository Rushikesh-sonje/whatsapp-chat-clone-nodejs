const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// data parsing from
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection succefull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1 = new Chat({
//     from : "Sakshi",
//     to:"Rushikesh",
//     msg:"How are u",
//     createdAt: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res); 
// }).catch((err)=>{
//     console.log(err);   
// })



// all routes
// index route
app.get("/chats",async (req,res)=>{
    let chat = await Chat.find();
    console.log(chat);
    res.render("index.ejs",{chat})
    //  res.send(" chats working");
})

// create new chat route(form)
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

// post route
app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat= new Chat({
        from:from,
        msg:msg,
        to:to,
        createdAt:new Date()
    })
    newChat.save().then((res)=>{
        console.log("saved successfully");  
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})


// update route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let { msg:newMsg} =req.body;
    await Chat.findByIdAndUpdate(id,{msg:newMsg,updatedAt: new Date()},{runValidators:true,new:true});
    res.redirect("/chats");
})

// delete route
app.delete("/delete/:id",async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})




// express setup
app.get("/", (req, res) => {
  res.redirect("/chats");
});


app.listen(8080,()=>{
    console.log("server is listening at 8080");
})