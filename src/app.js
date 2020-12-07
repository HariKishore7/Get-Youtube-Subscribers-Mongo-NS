
const express = require('express');
const app = express()
const SubscriberModel=require('./models/subscribers');

// Your code goes here
app.get('/subscribers',async(req,res)=>{
    res.send(await SubscriberModel.find());
});

// app.get('/subscribers/names',async(req,res)=>{
//     const fullResult = await SubscriberModel.find();
//     const mappedResults=fullResult.map(doc=>{
//         return{
//             name:doc.name,
//             subscribedChannel: doc.subscribedChannel
//         }
//     });
//     res.send(mappedResults);
// })
app.get('/subscribers/names',async(req,res)=>{
    const projectedResults = await SubscriberModel.find().select({
        //exclusive projection
        _id: false, //needs to explicitly excluded
        subscribedDate: false,
        __v:false
    });
    res.send(projectedResults);
});

app.get('/subscribers/:id',async(req,res)=>{
    const idToSearch = req.params.id;
    try{
    const doc = await SubscriberModel.findOne({_id: idToSearch});
    
    if(doc==null){
        res.status(400).send({message: "Id not found"});
    }else{
        res.send(doc);
    }
}
    catch(err){
        res.status(400).send({message: "Incorrect id format"});
    }
});

module.exports = app;
