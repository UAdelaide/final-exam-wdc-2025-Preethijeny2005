const express = require('express');
const path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');

const app = express();
const cors = require('cors');


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Using sessions - Middleware.
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogsRouter = require('./routes/dogs');
const authRoutes = require('./routes/authRoutes');


app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Export the app instead of listening here
module.exports = app;

