const express = require('express'); // using framework
const cors = require('cors'); // Cross-Origin Resource Sharing (CORS) : middleware to handle requests from different routes
const morgan = require('morgan'); // providing detailed logs about requests
const dotdev = require('dotenv'); // accessing port specified in .env file
const connectDb = require('./config/connectDb');
const donateRoute = require('./routes/donateRoute');
const postRoute = require('./routes/postRoute');
const alertRoute = require('./routes/alertRoute');
const path = require('path');
const parseDataFromXlsx = require('./parser');
const processDataForGraph = require('./processor');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cron = require('node-cron');

// configuring env
dotdev.config();

// database call
connectDb();

// REST object
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/donate', donateRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/posts', postRoute); // Mount the postRoute under /api/v1/posts
app.use('/api/v1',alertRoute);

// port
const port = 8001 || process.env.port;

// server start and Puppeteer scraping logic
const startScraping = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true }); // Set to true for production
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/post', { waitUntil: 'domcontentloaded' });

    let posts = [];
    let retries = 0; // To prevent infinite loops if no new posts are loaded

    while (posts.length < 10 && retries < 5) {
      // Scroll to load more posts
      const scrolled = await page.evaluate(() => {
        const postList = document.querySelector('.post-list');
        if (postList) {
          postList.scrollTop = postList.scrollHeight;
          return true;
        }
        return false;
      });

      if (!scrolled) {
        console.error('Post list container not found.');
        break;
      }

      await delay(2000); // Wait for new posts to load

      // Extract posts
      const newPosts = await page.evaluate(() => {
        const postElements = document.querySelectorAll('.post-card p');
        if (postElements.length === 0) return [];
        return Array.from(postElements).map((post) => post.innerText);
      });

      // Print each post content to the console
      newPosts.forEach(post => console.log('Post content:', post));

      // Add new posts to the collection (without deduplication)
      posts = posts.concat(newPosts);

      // Stop once we have 10 posts
      if (posts.length >= 10) {
        posts = posts.slice(0, 10);  // Keep only the first 10 posts
        break;
      }

      const previousPostCount = posts.length;
      if (posts.length === previousPostCount) {
        retries++; // Increment retries if no new posts are loaded
      } else {
        retries = 0; // Reset retries when new posts are added
      }
    }

    if (posts.length < 10) {
      console.warn(`Only ${posts.length} posts could be retrieved.`);
    }

    // Print the posts being sent to Flask API
    console.log('Posts being sent to Flask API:', posts);

    // Send posts to Flask API
    const response = await axios.post('http://127.0.0.1:5000/process_posts', { posts });
    console.log('Response from Flask:', response.data);

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

// Start server and trigger scraping logic once server is listening
app.listen(port, () => {
  console.log(`Server running on port:${port}`);

  // Start scraping after the server is ready
  startScraping();
  cron.schedule('*/5 * * * *', startScraping);
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
