const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/patient', (req, res) => {
  const sql = `SELECT * FROM patients WHERE id = '${req.query.id}'`;
  db.query(sql);
  res.send('ok');
});

module.exports = router;
