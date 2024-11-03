const express = require('express');
const SSLCommerzPayment = require('sslcommerz');
const router = express.Router();

// Route to initialize the SSLCommerz payment
router.post('/donate', async (req, res) => {
    const { amount } = req.body;

    const data = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: `REF${Date.now()}`, // Unique transaction ID
        success_url: 'http://localhost:3000/success', // Redirect URL on success
        fail_url: 'http://localhost:3000/fail',       // Redirect URL on failure
        cancel_url: 'http://localhost:3000/cancel',   // Redirect URL on cancellation
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_phone: '01711111111',
        // other necessary fields for SSLCommerz, like cus_address, cus_city, etc.
    };

    
    const sslcommer = new SSLCommerzPayment('testbox', 'qwerty',false) //true for live default false for sandbox
    sslcommer.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log("Redirecting to: ",GatewayPageURL);
        
    });
});

module.exports = router;
