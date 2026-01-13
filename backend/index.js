require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jobRoute = require('./routes/jobRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected'))
        .catch(err => console.error('MongoDB connection error',err));

app.use('/api/auth', authRoute);
app.use('/api/jobs', jobRoute);


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});