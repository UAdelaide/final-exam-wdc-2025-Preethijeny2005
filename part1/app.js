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
// First queston
app.get('/api/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute(`
      SELECT dog.name AS dog_name, dog.size AS size, user.username AS owner_username
      FROM Dogs dog
      JOIN Users user ON user.user_id = dog.owner_id
    `);
    console.log('Dogs fetched:', dogs);
    res.json(dogs);
  } catch (err) {
    console.error('Error fetching dogs:', err);
    res.status(500).json({ error: 'Failed to get the dogs' });
  }
});

// second question

app.get('/api/walkrequests/open', async (req, res) => {
  try {
    const [requests] = await db.execute(`SELECT req.request_id, dog.name AS dog_name, req.requested_time, req.duration_minutes, req.location, user.username AS owner_username
        FROM WalkRequests req
        JOIN Dogs dog ON req.dog_id = dog.dog_id
        JOIN Users user ON dog.owner_id = user.user_id
        WHERE req.status = 'open'
        `);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});


// third quesiton"
app.get('/api/walkers/summary', async (req, res) => {
  try {
    const [summary] = await db.execute(`SELECT user.username AS walker_username,
      COUNT(r.rating_id) AS total_ratings,
      ROUND(AVG(r.rating), 1) AS average_rating,
      COUNT(CASE WHEN walk.status = 'completed' THEN 1 END) AS completed_walks
      From Users user
      LEFT JOIN WalkRatings r ON user.user_id = r.walker_id
      LEFT JOIN WalkRequests walk ON r.request_id = walk.request_id
      WHERE user.role = 'walker'
      GROUP BY user.user_id;
      `);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get the walkers requests' });
  }
});


app.use(express.static(path.join(__dirname, 'public')));

const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;