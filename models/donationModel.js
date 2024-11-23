const mongoose = require('mongoose');


const donationSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    mail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    amount: {
        type: Number,
        required: true, 
    },
    tran_id: { 
        type: String,
        required: true,
        unique: true, // Ensure `tran_id` is unique in the database
      },
}, { timestamps: true }); 

const Donation=mongoose.model('Donation', donationSchema);


module.exports=Donation;