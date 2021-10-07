const express = require ('express');
const app = express();
app.use(express.json());
const profile=require('./profile');
const score=require('./score');

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

app.get('/yay', (req,res)=>{
    res.send("Yay");
})

app.get('/leaderboard', async (req,res)=>{
    let scores = await score.find({});
    console.log(scores[0]._doc.Name);
    let lb = scores.sort(function (a,b){
        return b._doc.Score - a._doc.Score;
    })
    res.send(lb);
})

app.post('/score', (req,res)=>{
    let newscore = score();
    newscore.Name=req.body.Name;
    newscore.Score=req.body.Score;
    newscore.save();
    res.send("done");
})

