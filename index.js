const express = require('express')
const app = express()
app.use('/static', express.static('client'))
app.use('/api/todo', require('./todo/api'));
// Redirect root to /books
app.get('/task', (req, res) => {
    res.redirect('/client/task/index.html');
});
app.get('/date', (req, res) => {
    res.redirect('/client/date/index.html');
});
app.get('/', (req, res) => {
    res.redirect('/static/date');
});
// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;