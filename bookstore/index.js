const express = require('express')
const db = require('./db')
const datastore = require('./schema')
const middleware  = require('./auth.middleware')
const app = express()
app.use(express.json())


// get route

app.get('/',(req,res)=>{
    res.send('welcome to the book store')
})

app.get('/books/book/:id',async(req,res)=>{

    const {id} = req.params;
    const getdata = await datastore.findById(id);
    
    if(getdata){
        res.status(200).send(getdata)
    }
    else{

        res.status(404).send("Something went wrong")
    }
})

app.get('/books',async(req,res)=>{
    const datas = await datastore.find();
    res.send(datas);
})

// delete route

app.delete('/books/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const deleted = await datastore.findByIdAndDelete(id,req.body);
    res.send(deleted)
})

// post route

app.post('/books/addbooks',middleware,async(req,res)=>{
    const datas = await datastore.create(req.body);
    res.send(datas);
})

// patch route

app.patch('/books/update/:id',async(req,res)=>{
    const {id} = req.params

    const update = await datastore.findByIdAndUpdate(id,req.body)
    res.send(update)
})

// filters on author category and lth to htl

app.get('/books/filter',async(req,res)=>{

    const {author,category,sort} = req.query;
    if(sort == "lth"){
        const filter = await datastore.find().sort({price : 1})
        res.send(filter)
    }
    else if(sort == "htl"){
        const filter = await datastore.find().sort({price : -1})
        res.send(filter)
    }
    else if(author){
        const filter = await datastore.find({author : author})
        res.send(filter)
    }
    else if(category){
        const filter = await datastore.find({category : category})
        res.send(filter)
    }
    
})

app.listen(8090,()=>{
    console.log('port is running on port 8090');
    db();
})