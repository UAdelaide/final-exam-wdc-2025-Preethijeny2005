const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.execute(`
      SELECT dog_id, name AS dog_name, size, user.username AS owner_username
      FROM Dogs
      JOIN Users user ON user.user_id = Dogs.owner_id
    `);
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;