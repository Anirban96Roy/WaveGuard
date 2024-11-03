const express = require('express') // using framework
const cors = require('cors') // Cross-Origin Resource Sharing (CORS) : middleware to handle requests from different routes
const morgan = require('morgan') // providing detailed logs about requests
const dotdev = require('dotenv') // accessing port specified in .env file
const connectDb = require('./config/connectDb')
const donateRoute=require('./routes/donateRoute');


//configuring env
dotdev.config()

// database call
connectDb()

// REST object
const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/v1/users',require('./routes/userRoute'))
app.use('/api/v1/donate', donateRoute);


//port 
const port = 8000 || process.env.port

//listening port
app.listen(port, ()=>
{
    console.log(`Server running on port:${port}`);
})
