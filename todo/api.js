'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firestore');
const router = express.Router();
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    console.log(req.body);
    let date = req.query.date;
    const book = await db.update(req.body.user, date, req.body);
    res.json(book);
});
module.exports = router;