"use strict";
const express = require("express");
const bookRoutes = express.Router();
const auth = require('./Auth.js');


let Entry = require("../Models/book.model");





//add book
bookRoutes.post('/add', async (req, res) => {

  const placeId = req.body.placeId;
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;
  const country = req.body.country;
  const username = req.body.username;

 

  let newEntry;


  if ( placeId == "" || checkInDate == "" || checkOutDate == "" || country == "" || username == "") {
    return res.status(200).json({ warn: "Necessary fields are empty" });
  


  } else {

    newEntry = new Entry({  placeId, country, checkInDate,  checkOutDate, username});

    console.log("added entry is", newEntry);



    await newEntry.save().then(response => {



      res.status(200).json({ response })


    }).catch((err) => {
      res.status(400).json({ warn: "Unexpected error!" })

      console.log("Error is", err);

    });



  }


});



//update booking by id


bookRoutes.post('/update/:id' , auth,async (req, res) =>{

  Entry.findById(req.params.id).then(

    EntryObj=>{
      EntryObj.checkInDate = req.body.checkInDate;
      EntryObj.checkInOut = req.body.checkOut;
      EntryObj.placeId = req.body.placeId;
      EntryObj.username = req.body.username;
      EntryObj.country = req.body.country;
    
      
    

        EntryObj.save().then(()=> res.json('Updated')).catch(err => res.status(400).json('Erro ' + err));

      }

  ).catch(err => res.status(400).json('Error ' + err));


});


//delete booking by ID
bookRoutes.delete('/delete/:id',auth,async (req, res) =>{

  await Entry.findByIdAndDelete(req.params.id).then(Entry => res.json('Booking deleted'))
  .catch((err) => {res.status(400).json('Error: ' + err)

  console.log("Delete Error" , err);
  

});

});

//get all
bookRoutes.get("/", async (req, res) => {
  await Entry.find(function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
    }
  }).sort({ updatedAt: -1 });
});






module.exports = bookRoutes