const express = require('express');
const connectDB = require('./db');

const app = express();
require('dotenv').config();


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
