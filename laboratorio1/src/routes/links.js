const express = require('express');
const router = express.Router();

const connections = require('../database');
const { restart } = require('nodemon');

router.get('/add', (req, res) => {
	res.send('form');
});

module.exports = router;
