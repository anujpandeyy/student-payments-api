const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
   name:{
    type: String,
    required: [true,"Name is required"],
   },
   stream:{
    type: String,
    required:[true,"Stream is required"],
   },
   year:{
    type: Date,
    required:[true,"Year is required"],
   },
   phone:{
    type: Number,
    required:[true,"Phone is required"],
   },
   fees:{
    type: Number,
    required:[true,"Fees is required"],
   },
   feesPaid:{
    type: Boolean,
    default: false,
   }
},{
    timestamps:true,
});

module.exports = mongoose.model("Student",studentSchema);