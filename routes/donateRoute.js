const express = require('express');
const SSLCommerzPayment = require('sslcommerz-lts');
const Donation = require('../models/donationModel');

const router = express.Router();

router.post('/init', async(req, res) => {
    const { name,mail,amount } = req.body; 
    const donationData={name,mail,amount};
    const donation= new Donation(donationData);
    try {
        await donation.save(); 
    } catch (error) {
        console.error('Error saving donation:', error);
        return res.status(500).json({ message: 'Failed to save donation' });
    }


    const data = {
        total_amount: amount, // Use the dynamic amount here
        currency: 'BDT',
        tran_id: 'REF' + new Date().getTime(), // Unique transaction ID
        success_url: 'http://localhost:8000/api/v1/donate/success',
        fail_url: 'http://localhost:8000/api/v1/donate/fail',
        cancel_url: 'http://localhost:8000/api/v1/donate/cancel',
        ipn_url: 'http://localhost:8000/api/v1/donate/ipn',
        shipping_method: 'Courier',
        product_name: 'Donation',
        product_category: 'Service',
        product_profile: 'non-physical-goods',
        cus_name: name,
        cus_email: mail,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(process.env.store_id, process.env.store_pass, false);
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            return res.status(200).json({ GatewayPageURL });
        } else {
            return res.status(400).json({ message: 'Payment initialization failed' });
        }
    }).catch(error => {
        console.error('SSLCommerz initialization error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
});
// Success route
router.post('/success', async (req, res) => {
    const paymentData = req.body; 

   
    const donation = await Donation.findOne({ tran_id: paymentData.tran_id }); 
    
    if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
    }

    
    donation.status = 'successful'; 
    await donation.save();

    
    res.status(200).json({
        message: 'Payment successful',
        donation: {
            name: donation.name,
            email: donation.mail,
            amount: donation.amount,
            status: donation.status,
        },
    });
});


router.post('/fail', (req, res) => {
   
    res.status(400).json({ message: 'Payment failed' });
});

// Cancel route
router.post('/cancel', (req, res) => {
    // Handle the cancellation case here
    res.status(200).json({ message: 'Payment canceled' });
});

module.exports = router;
