const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const db = require('./db/db')
const cors = require('cors'); 


const AccountRoute = require('./routes/accountRoutes')
const app = express();

app.use(cors()); 

app.use(express.json());

db()
app.use( AccountRoute)
app.listen(7001, () => {
    console.log(`Server is running on port ${7001}`);
  });