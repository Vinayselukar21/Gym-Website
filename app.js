const express = require("express");
const path = require("path");
const fs = require("fs");                             //not in use
const bodyparser = require('body-parser');           //not in use
const app = express();
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactGym',{useNewUrlParser: true});

const contactSchema = new mongoose.Schema({                 //mongoose schema ....data to be stored in this format
    name: String,
    phone: String,
    age: String,
    gender: String,
    email: String,
    concern: String
});

const GymContact = mongoose.model('Contact', contactSchema);            //mongoose model

// EXPRESS
app.use("/static", express.static("static")); //For serving Static files
app.use(express.urlencoded());

// PUG
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directoery

app.get('/',(req,res)=>{
    res.render('home.pug');
})

// ENDPOINTS
app.get("/contact", (req, res) => {
    const msg={}
  res.render("contact.pug",msg);
});

app.post("/contact", (req, res) => {
    const mydata = new GymContact(req.body);
    mydata.save().then(()=>{
        res.send('data has been saved successfully in db')
        }).catch(()=>{
        res.status(400).send('data has not been saved to db')
    })
});


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  })