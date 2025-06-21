const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});

module.exports = router;