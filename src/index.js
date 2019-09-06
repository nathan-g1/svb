var express = require("express");
var app = express();
var PORT = 3001;

app.get('/', function (req, res) {
    res.send('Hello There');
});

app.post('/h', function (req, res) {
    res.send({ name: 'asdfasd', age: 234, phone: 234234, url: 'facebook.com' });
});

app.get('/users', function (req, res) {
    var users = [
        { name: 'asdfasd', age: 234, phone: 234234, url: 'facebook.com' },
        'nathan',
        'abebe',
        'asdf',
        'aedni'
    ];
    res.send(users);
});

app.listen(PORT);