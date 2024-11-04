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
}, { timestamps: true }); 

const Donation=mongoose.model('Donation', donationSchema);


module.exports=Donation;
