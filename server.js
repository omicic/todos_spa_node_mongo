const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('oliveradb',['todos']);

const app =  express();
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.post('/save', (req,res)=>{

    let msg = req.body.msg;
   // console.log(msg)
    db.todos.insert({msg:msg, date:new Date().toDateString()},
    /* (err,data)=>{
        res.send("Ok")
    } */)
    res.send(msg)
})

app.get('/get_data',(req,res)=>{
   
     db.todos.find((err,data)=>{
        //console.log(data)
        res.send(data);
    })
})

app.post('/delete',(req,res)=>{
    let id = req.body.id;
    db.todos.remove({"_id": db.ObjectId(id)});
    res.send()
})

app.listen(3000, ()=>{
    console.log('....');
})