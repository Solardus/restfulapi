const express = require ('express');
const app = express();
app.use(express.json());
const profile=require('./profile');
const score=require('./score');

const client = require('mongoose');
const Score = require('./score');
const Message = require('./message')
const uri = "mongodb+srv://Owner:kfJq2LPkZ4AY3ugR@chatappcluster.dumlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
client.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 80;
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
    let lb = scores.sort(function (a,b){
        return b._doc.Score - a._doc.Score;
    })

    const top3 = [];
    for(let i = 0;i<3;i++)
    {
        let entry = {
            Name: scores[i].Name,
            Score: scores[i].Score,
            Position: i+1
        }
        top3.push(entry)
    }

    res.send(top3);
})

app.post('/score', (req,res)=>{
    let newscore = score();
    newscore.Name=req.body.Name;
    newscore.Score=req.body.Score;
    newscore.save();
    res.send("done");
})


app.post('/message', (req,res)=>{
    let newmessage = Message();
    newmessage.Name = req.body.Name;
    newmessage.Text = req.body.Text;
    newmessage.save();
    res.send("done");
})

app.get('/chat', async (req,res)=>{
    let messages = await Message.find({});
    let count =  await Message.find({}).count();

    const messagelog = [];
    for(let i = 0;i<count;i++)
    {
        let entry = {
            Name: messages[i].Name,
            Text: messages[i].Text
        }
        messagelog.push(entry)
    }

    res.send(messagelog);
})

