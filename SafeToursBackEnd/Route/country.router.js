"use strict";
const express = require("express");
const countryRoutes = express.Router();
const auth = require('./Auth.js');

const fetch = require('node-fetch');


const cloudinary = require("cloudinary").v2;
const fileupload = require('express-fileupload');


let Entry = require("../Models/country.model");


//cloudnary credentiols
cloudinary.config({
  cloud_name: "fashionistaimage",
  api_key: "822148795585776",
  api_secret: "1FbjgHZVhCiU_XRO-rHY7SNE4v0"


});


//get covid data function

async function getCovidData(country)
     {

        let country_input = country; 

      
        
         const response_2 = await fetch("https://api.covid19api.com/dayone/country/" +   country_input );
         const data_world_2 = await response_2.json();
         let last_value = data_world_2[data_world_2.length-1];


    

            let confirmed_value = last_value.Confirmed;
            let death_value = last_value.Deaths;
            let recovered_value = last_value.Recovered;
            let active_value = last_value.Active;
            

            let safty_rating = ( recovered_value - death_value - active_value )/confirmed_value ;
           
            let safeR = safty_rating*100;
            let covidObj = {confirmed_value,death_value,recovered_value,active_value,safeR};
            return covidObj ;

     }


     async function appendCovidData(countrys)
     {

        let countrys_input = []; 
        let countrys_output = []; 

        countrys_input = countrys;
        
        
        countrys.forEach( async EntryObj => {

          let countryV2 = EntryObj.name.split(" ").join("-");

        
          const covid_Rate_obj = await getCovidData(countryV2);

          console.log("covid_Rate_obj inside is ",covid_Rate_obj);

          let response_Object = {EntryObj, covid_Rate_obj };

          console.log("Response obj inside is ",covid_Rate_obj); 

          countrys_output.push(response_Object);
          console.log("Array is ",countrys_output);

          
        });

       
        return  countrys_output;

     }


//uplod image
countryRoutes.post('/upload', auth, (req, res) => {


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









//add country
countryRoutes.post('/add', async (req, res) => {

  const name = req.body.name;
  const description = req.body.description;
  let img = req.body.img;
 

  let newEntry;


  if (name == "" || description == "" ) {
    return res.status(200).json({ warn: "Necessary fields are empty" });
  }

  const exist = await Entry.findOne({ name: name })


  if (exist) {
    return res.status(200).json({ warn: "Country Already Exists" })
  }



  if (img === null || img === undefined || img === "") {

    return res.status(200).json({ warn: "Image field can not be empty" });
    console.log("added entry is", newEntry);

  } else {

    newEntry = new Entry({ name, description,  img});

    console.log("added entry is", newEntry);



    await newEntry.save().then(response => {



      res.status(200).json({ response })


    }).catch((err) => {
      res.status(400).json({ warn: "Unexpected error!" })

      console.log("Error is", err);

    });



  }


});












// get by country
countryRoutes.get("/covid/:country",async (req, res) =>{

  let country = req.params.country;


  // repalce space with dash
  let countryV2 = country.split(" ").join("-");
  console.log("country format :" , countryV2 );

  await Entry.findOne({ name: country }, async function (err, EntryObj) {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: "External Covid API is Down" });
    } else {

       // call covid data fetch function 
      const covid_Rate_obj =  await getCovidData(countryV2);

      // modify country object

      console.log("found product is", EntryObj);

      let response_Object = {EntryObj, covid_Rate_obj }

      res.status(200).json({ success: true, data: response_Object });
      console.log("Passed product is", response_Object);
      console.log("covid rate = ",covid_Rate_obj.safeR);
      
    }
  });


 
});


//get all contry with covid rate
countryRoutes.get("/allCovid", async (req, res) =>{


  await Entry.find( async function (err, Entry) {
    if (err) {
      console.log(err);
    } else {

      let countryArr =[];

          countryArr =  appendCovidData(Entry);
      
          console.log("Country data Array is",countryArr );
      
          res.status(200).json({ success: true, data: countryArr});
// 
        
    

      console.log("Country data Array is",countryArr );
      
      res.status(200).json({ success: true, data: countryArr});
    }
  }).sort({updatedAt:-1});
});




// get all country
//get all
countryRoutes.get("/covid", async (req, res) => {
  await Entry.find(async function (err, Entry) {
    if (err) {
      console.log(err);
    } else {

      let CovidCountryArray = [];

      let l = 0;
      let entryL=Entry.length;
      console.log("Entry Size ",entryL );

      async function executeCovidRateFinder () {
       await Entry.forEach(async element =>  {

      // repalce space with dash
         let countryV2 = element.name.split(" ").join("-");
         let covid_Rate_obj =  await getCovidData(countryV2);
         let response_Object = {Entry, covid_Rate_obj }
        //  console.log("res ob" , response_Object);
         CovidCountryArray.push(response_Object);
        //  console.log("res array" , CovidCountryArray);
        l++;
        console.log("L Size ",l );

      });
    }

      await executeCovidRateFinder();

     

      console.log("covid objects are ",CovidCountryArray);
      res.status(200).json({ success: true, data: CovidCountryArray });

      
    }
  }).sort({ updatedAt: -1 });
});







//get all
countryRoutes.get("/", async (req, res) => {
  await Entry.find(function (err, Entry) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: Entry });
    }
  }).sort({ updatedAt: -1 });
});





module.exports = countryRoutes