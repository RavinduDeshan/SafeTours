"use strict";
const express = require("express");
const placeRoutes = express.Router();
const auth = require('./Auth.js');



const cloudinary = require("cloudinary").v2;
const fileupload = require('express-fileupload');


let Entry = require("../Models/place.model");


//cloudnary credentiols
cloudinary.config({
  cloud_name: "fashionistaimage",
  api_key: "822148795585776",
  api_secret: "1FbjgHZVhCiU_XRO-rHY7SNE4v0"


});

//uplod image
placeRoutes.post('/upload', auth, (req, res) => {


  if (req.files === null) {
    return res.status(200).json({ msg: "No file is Selected to upload. Please select a file first!" })
  }
  const file = req.files.img;
  console.log("uplod file is:", file);


  cloudinary.uploader.upload(file.tempFilePath, function (err, result) {

    if (err) {

      console.log("Error is :", err);

      return res.status(400).json({ msg: "Server Error not Uploaded" })

    } else {
      console.log("Result is :", res);




      console.log("response URL: ", result.url);
      res.status(200).json({ URL: result.url })

    }


  });



})









//add place
placeRoutes.post('/add', async (req, res) => {

  const name = req.body.name;
  const description = req.body.description;
  let img = req.body.img;
  const country = req.body.country;
 

  let newEntry;


  if (name == "" || description == "" || country == "") {
    return res.status(200).json({ warn: "Necessary fields are empty" });
  }

  const exist = await Entry.findOne({ name: name })


  if (exist) {
    return res.status(200).json({ warn: "This Place Already Exists" })
  }



  if (img === null || img === undefined || img === "") {

    return res.status(200).json({ warn: "Image field can not be empty" });
    console.log("added entry is", newEntry);

  } else {

    newEntry = new Entry({ name, description,  img , country});

    console.log("added entry is", newEntry);



    await newEntry.save().then(response => {



      res.status(200).json({ response })


    }).catch((err) => {
      res.status(400).json({ warn: "Unexpected error!" })

      console.log("Error is", err);

    });



  }


});

//manager end point to get places by id
placeRoutes.get("/:id",async (req, res) =>{

  console.log("come Here");
  let id = req.params.id;
  await Entry.findOne({ _id: id }, function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
      console.log("Passed product is", Entry);
      
    }
  });
});





//get all
placeRoutes.get("/", async (req, res) => {
  await Entry.find(function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
    }
  }).sort({ updatedAt: -1 });
});


// get by country
placeRoutes.get("/byCountry/:country",async (req, res) =>{

  let country = req.params.country;
   

  await Entry.find({ country: country }, function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
      console.log("Passed product is", Entry);
      
    }
  });
});







module.exports = placeRoutes