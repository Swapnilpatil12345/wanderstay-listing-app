const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,

  },

  description: {
    type: String,
  },

  image: {
    _id: false,
    url:{
      type: String,
      default: "https://images.unsplash.com/photo-1462823985959-022de68638a2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  
      
      set:(value) => value && value.trim() !== ""?value:"https://images.unsplash.com/photo-1462823985959-022de68638a2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  
    filename: { 
      type: String, 
      default: "defaultimage"
    }
  },  

  price:{
    type: Number,
    
  },

  location: {
    type: String,
    
  },

  country: {
    type: String,
   
  },

  reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});


const Listing = mongoose.model("Listing", listingSchema);
                                // mongoose automatically pluralizes the model name and makes it lowercase
module.exports = Listing;