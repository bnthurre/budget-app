const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const db = require('./db/db')
const cors = require('cors'); 


const AccountRoute = require('./routes/accountRoutes')
const CategoryRoute = require('./routes/categoryRoutes')
const budgetAllocation = require('./routes/budgetAllocationRouter')
const budgetPayment = require('./routes/budgetPaymentRouter')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const app = express();

app.use(cors()); 

app.use(express.json());

db()
app.use( AccountRoute)
app.use( CategoryRoute)
app.use( budgetAllocation)
app.use( budgetPayment)
app.use( userRoute)
app.use('/api/auth', authRoute)
app.listen(7001, () => {
    console.log(`Server is running on port ${7001}`);
  });