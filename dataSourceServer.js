const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./usersArgon');
const fs = require('fs');
const csvToJSON = require('convert-csv-to-json')
const user = new User();

const DATA_SOURCE = 'downloads/cb_people.csv';

app.set('port', process.env.PORT || 9040);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/dataSource', (req, res) => {

    TimeNow = new Date();
    msg = '\n data Source Request recieved at: ' + TimeNow + '\n'; 
    msg = "User: " + req.query.login + '\n'; 
    console.log(msg);

    msg = 'Reading data from file: ' + DATA_SOURCE;
    console.log(msg);
    
    let json = csvToJSON.getJsonFromCsv(DATA_SOURCE);

    for(let i=0; i<json.length;i++){
        console.log(json[i]);
    }

    res.writeHead(200, {'Content-Type': 'JSON'});
    res.end(JSON.stringify(json));
    //res.end(json);
});

app.listen(app.get('port'), () => {
    console.log('DataSourcing Server listening on: http://localhost:%s', app.get('port'));
});

module.exports = app;