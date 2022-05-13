const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('ristedbdva', ['user']);
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    db.user.find((err, data) => {
        response.render('index', { data: data });
    })
})

// add account url
app.get('/add', (request, response) => {
    response.render('add-account');
})

// save data 
app.post('/save', (request, response) => {
    db.user.insert({
        name: request.body.name,
        job: request.body.job,
        age: request.body.age
    }, (err, data) => {
        response.redirect('/');
    })
})

app.get('/edit', (request, response) => {
    db.user.find((err, data) => {
        response.render('edit-view', { data: data });
    })
})

//delete account
app.get('/delete-acc/:id', (request, response) => {
    let id = request.params.id;
    // console.log/(id);
    db.user.remove({ "_id": db.ObjectId(id) }, (err, data) => {
        response.redirect('/');
    })
})

//edit account
app.get('/edit-acc/:id', (request, response) => {
    let id = request.params.id;
    db.user.findOne({ "_id": db.ObjectId(id)}, (err,data) => {
        response.render('view_change', {data: data});
    })
})

 app.post('/change', (request, response) => {
     let id = request.body.id;
     db.user.update({"_id" : db.ObjectId(id)},{$set: { 
         name : request.body.name,
         job: request.body.job,
         age: request.body.age
     }}, (err,data) => {
         response.redirect('/')
     })
 })

app.listen(3000, () => {
    console.log("Listening to port 3000");
})