const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let Book = new Schema(
  {
    placeId: {
     
      type: String,
      required: true,
    },
    country: {
     
      type: String,
      required: true,
    },

    checkInDate: {
      type: String,
      required: true,
    },
    
    checkOutDate: {
     
      type: String,
      required: true,
    
    },
   
    username: {
     
      type: String,
      required: true,
    
    },
   
  
   
    
  },
  {
    timestamps:true,
    collection: "book",
  }
);

module.exports = mongoose.model("book", Book);
