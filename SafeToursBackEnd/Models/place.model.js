const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let Place = new Schema(
  {
    name: {
      unique:true,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    country: {
     
      type: String,
      required: true,
    
    },
   
    img: {
      type: String,
      required: true,
    }


   
    
  },
  {
    timestamps:true,
    collection: "place",
  }
);

module.exports = mongoose.model("Place", Place);
