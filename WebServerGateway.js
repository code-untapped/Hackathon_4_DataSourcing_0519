const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy'); // TODO: Ensure this is directly registered in package.json
const UIControls = require('./UIControlGroups');
const proxy = httpProxy.createProxyServer({});


const app = express();


const loginServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:8880'});
const userAdminServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9010'});
const encryptServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9020'});
const decryptServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9030'});
const dataSourceServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9040'});
const performancedataSourceServiceProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9050'});
const dataSourceFundingRProxy = (req, res) => proxy.web(req, res, {target: 'http://localhost:9060'});


app.set('port', process.env.PORT || 3000);
// app.set('httpsPort', process.env.HTTPS_PORT || 3000); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('downloads'));

// app.use(busboy());

app.use((req, res, next) => {
    // TODO: Check for NODE_ENV development
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/login', (req,res, next) => {
    TimeNow = new Date();
    msg = '\n Login Request recieved at: ' + TimeNow + '\n'; 
    console.log(msg);

    const userUIControls = new UIControls();
    userUIControls.LoadLoginPage().then( function(data) {
        msg = 'Login response: \n' + data;
        console.log(msg);
        res.writeHead(200, {'Content-Type': 'HTML'});
        res.end(data);        
    }, function(error) {
        console.log(error);
    });
});

app.get('/authenticate', (req, res) => {
    console.log('Attempted login: ' + req.query.login)
    loginServiceProxy(req, res);
});

app.post('/createUser', (req, res) => {
    console.log('Attempted CreateUser: ' + req.query.login)
    userAdminServiceProxy(req, res);
});

app.post('/enCryptData', (req, res) => {
    console.log('Attempted Encryption: ' + req.query.login)
    encryptServiceProxy(req, res);
});

app.get('/decryptData', (req, res) => {
    console.log('Attempted decryption: ' + req.query.login)
    decryptServiceProxy(req, res);
});

app.get('/peopleDataSource', (req, res) => {
    console.log('Attempted peopleDataSourcing: ' + req.query.login)
    dataSourceServiceProxy(req, res);
});

app.get('/fundingDataSource', (req, res) => {
    console.log('Attempted fundingDataSourcing: ' + req.query.login)
    dataSourceServiceProxy(req, res);
});

app.get('/dataSourceFundingRounds', (req, res) => {
    console.log('Attempted dataSourcing: ' + req.query.login)
    dataSourceFundingRProxy(req, res);
});

app.get('/datasourceperformanceServer', (req, res) => {
    console.log('I got the right endpoint')
    performancedataSourceServiceProxy(req, res);
});


const httpServer = http.createServer(app);

httpServer.listen(app.get('port'), () => {
    console.log('App Server listening on: http://localhost:%s', app.get('port'));
});

module.exports = app;