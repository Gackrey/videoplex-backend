const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoute = require('./routes/router')
const { notFound, errorOccered } = require("./errorHandlers");
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
app.use(notFound)
app.use(errorOccered)

app.listen(PORT, () => {
  console.log('Server Started at port', PORT);
})