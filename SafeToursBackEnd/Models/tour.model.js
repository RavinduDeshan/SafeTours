const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let Tour = new Schema(
  {
    countryId: {
     
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    
    bookings: {
     
      type: Array,
    },
      
    
      username: {
       
        type: String,
        
    
    },
   
  
   
    
  },
  {
    timestamps:true,
    collection: "tour",
  }
);

module.exports = mongoose.model("tour", Tour);
