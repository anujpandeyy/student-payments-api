const express = require('express');
const app = express();
const connectDB = require('./config/dbConnection');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
connectDB();
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
