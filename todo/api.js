'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firestore');
const router = express.Router();
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    console.log(req.body);
    let date = req.query.date;
    console.log("date:" + date)
    const book = await db.update(req.body.user, date, req.body);
    res.json(book);
});
router.get('/', async(req, res) => {
    let date = req.query.date;
    console.log("date:" + date)
    const tasks = await db.getDataFor('1', date);
    console.log("GET response:" + tasks);
    res.status(200).json(tasks);
});
module.exports = router;