const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.router')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const { initialzeDBConnection } = require('./db/db')
initialzeDBConnection();
const PORT = process.env.PORT || 3000;
app.get('/', (request, response) => {
  response.json({ hello: "world" })
});

app.use('/user',userRoute)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message })
})

app.listen(PORT, () => {
  console.log('Server Started at port', PORT);
})