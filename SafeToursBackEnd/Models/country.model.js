const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let Country = new Schema(
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
    
  
   
    img: {
      type: String,
      required: true,
    }


   
    
  },
  {
    timestamps:true,
    collection: "country",
  }
);

module.exports = mongoose.model("Country", Country);
