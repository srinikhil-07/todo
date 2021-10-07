'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firestore');
const router = express.Router();
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    console.log(req.body);
    let date = req.query.date;
    let id = req.query.userId;
    console.log("date:" + date)
    const book = await db.update(id, date, req.body);
    res.json(book);
});
router.get('/', async(req, res) => {
    let date = req.query.date;
    let user = req.query.user;
    console.log("date:" + date)
    const tasks = await db.getDataFor(user, date);
    console.log("GET response:" + tasks);
    res.status(200).json(tasks);
});
module.exports = router;