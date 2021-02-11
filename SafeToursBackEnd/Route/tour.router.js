"use strict";
const express = require("express");
const tourRoutes = express.Router();
const auth = require('./Auth.js');


let Entry = require("../Models/tour.model");

let bookEntry = require("../Models/book.model");



//add tour
tourRoutes.post('/add', async (req, res) => {

  const countryId = req.body.countryId;
  const startDate = req.body.startDate;
  const username = req.body.username;

 

  let newEntry;


  if ( countryId == "" || startDate == "") {
    return res.status(200).json({ warn: "Necessary fields are empty" });
  


  } else {

    newEntry = new Entry({  countryId,  startDate , username});

    console.log("added entry is", newEntry);



    await newEntry.save().then(response => {



      res.status(200).json({ response })


    }).catch((err) => {
      res.status(400).json({ warn: "Unexpected error!" })

      console.log("Error is", err);

    });



  }


});



// attach Booking

tourRoutes.post('/attach/:id' , auth,async (req, res) =>{



  Entry.findById(req.params.id).then(

    EntryObj=>{
      EntryObj.bookings.push(req.body.bookId);
      
    

        EntryObj.save().then(()=> res.json('Updated')).catch(err => res.status(400).json('Erro ' + err));

      }

  ).catch(err => res.status(400).json('Error ' + err));


});




// get by country
tourRoutes.get("/byCountry/:countryId",async (req, res) =>{

  let countryId = req.params.countryId;
   

  await Entry.findOne({ countryId: countryId }, function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
      console.log("Passed product is", Entry);
      
    }
  });
});


//get all
tourRoutes.get("/", async (req, res) => {
  await Entry.find(function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
    }
  }).sort({ updatedAt: -1 });
});






module.exports = tourRoutes