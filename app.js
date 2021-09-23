const express = require ('express');
const app = express();
app.use(express.json());
const profile=require('./profile');

const client = require('mongoose');
const uri = "mongodb+srv://Owner:kfJq2LPkZ4AY3ugR@chatappcluster.dumlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
client.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.port || 8000;
app.listen(port,() => {
    console.log("Server Started");
})


app.get('/', (req,res)=>{
    res.send("hello");
})


app.get('/profile', (req,res)=>{
    res.send("userprofile");
})

app.get('/profile/:id', (req,res)=>{
    let result = profile.findById(req.params.id)
    .then(p => {
        res.send(p);
    })
    
})

app.post('/profile', (req,res)=>{
    let newprofile = profile();
    newprofile.Name=req.body.name;
    newprofile.save();
})