const Donation = require('../models/Donation');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const TwoCaptcha = require('2captcha').Solver;

const donationsController = async (req, res) => {
    const { tran_id, name, email, amount, orgId } = req.body;

  // Ensure orgId is a valid ObjectId or convert it
  try {
    // Create the donation document
    const donation = new Donation({
      tran_id: tran_id || `donation-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, // Ensure orgId is valid
      name,
      email,
      amount,
      orgId,
    });

    // Save the donation to the database
    await donation.save();

    res.status(200).json({ message: 'Donation saved to the database!' });
  } catch (error) {
    console.error('Error saving donation to the database:', error);
    res.status(500).json({ message: 'Failed to save donation', error });
  }
  };


  const automationController = async (req, res) => {
    const { name, email, amount, orgId } = req.body; // Extract form data
    console.log('Request body:', req.body);

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        if (Number(orgId) === 1) {
            console.log('Navigating to ASSF...');
            await page.goto('https://donation.bkash.com/en/assf/donate', { waitUntil: 'networkidle2' });
        } else if (Number(orgId) === 2) {
            console.log('Navigating to BARF...');
            await page.goto('https://donation.bkash.com/en/barf/donate', { waitUntil: 'networkidle2' });
        } else {
            console.log('Navigating to BRCS...');
            await page.goto('https://donation.bkash.com/en/brcs/donate', { waitUntil: 'networkidle2' });
        }
        console.log('Navigation successful, URL:', page.url());

        // Fill out the form fields
        await page.type('#nameInput', name);
        await page.type('#emailInput', email);
        await page.type('#amountInput', String(amount));

        // Handle the CAPTCHA
//        await page.waitForSelector('#recaptcha-anchor', { visible: true });
//        await page.click('#recaptcha-anchor');
//        console.log('ReCAPTCHA checkbox clicked');

//        await page.waitForFunction(() => {
//            const checkbox = document.querySelector('#recaptcha-anchor');
//            return checkbox && checkbox.getAttribute('aria-checked') === 'true';
//        });
//        console.log('ReCAPTCHA verified successfully');
//
//        // Submit the form
//        await page.click('#bKash_button');
//        await page.waitForNavigation({ waitUntil: 'networkidle0' });

  //      console.log('Donation submitted to the payment gateway.');

   //     await browser.close();
        res.status(200).json({ message: 'Donation processed successfully!' });
    } catch (error) {
        console.error('Error automating payment gateway interaction:', error);
        res.status(500).json({ message: 'Failed to process payment gateway donation', error });
    }
};




  module.exports = { donationsController, automationController };