var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');
const { Server } = require('http');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

// Route to return books as JSON
app.get('/api/dogs', async (req, res) => {
  try {
      const [dogs] = await db.execute(`SELECT dog.name AS dog_name, dog.size AS size, user.username AS owner_username
        FROM Dogs dog
        JOIN Users user ON user.user_id = dog.owner_id
        `);
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

app.get('api/walkrequests/open',sync(req, res))

app.use(express.static(path.join(__dirname, 'public')));

const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;