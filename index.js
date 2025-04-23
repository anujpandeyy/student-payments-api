const express = require('express');
const app = express();
const connectDB = require('./config/dbConnection');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use('/students',require('./routes/studentRoute'));
connectDB();
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
