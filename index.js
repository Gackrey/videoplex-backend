const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user.router')
const videoRoute = require('./routes/video.router')
const notFound = require('./errorHandlers/routeNotFound')
const errorOccered = require('./errorHandlers/errorOccered')
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const { initialzeDBConnection } = require('./db/db')
initialzeDBConnection();
const PORT = process.env.PORT || 3000;
app.get('/', (request, response) => {
  response.json({ hello: "world" })
});

app.use('/user',userRoute)
app.use('/video',videoRoute)
app.use(notFound)
app.use(errorOccered)

app.listen(PORT, () => {
  console.log('Server Started at port', PORT);
})