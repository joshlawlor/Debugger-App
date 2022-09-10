const express = require('express');
const app = express();
const path = require('path');
const normalizePort = require('normalize-port')
const PORT = normalizePort(process.env.PORT || '9000')
const cors = require('cors')
const logger = require('morgan');

// Require .env, db, passport
require('dotenv').config();
require('./config/db')
app.use(cors({origin: '*', methods: "GET, POST, PUT, DELETE, PATCH", credentials: true}))

const postRoutes = require('./routes/postRoutes')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))




// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', '/Debugger-App/debugger-app/index.html'));
//   });
// Put API routes here, before the "catch all" route
app.use('/posts', postRoutes)

app.listen(PORT, function() {
  console.log(`Running on port ${PORT}`)
});

