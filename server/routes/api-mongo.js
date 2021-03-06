const express = require('express');
const router = express.Router();

var mysql = require("mysql");
var connection = null;

/* Setup connection to MySQL DB */
router.use(function(req, res, next){
	connection = mysql.createConnection({
        multipleStatements: true,
        host: 'ec2-52-64-215-106.ap-southeast-2.compute.amazonaws.com',
        user: 'mike',
        password: 'sanfl',
        database: 'SANFLFixtures'
	});
	connection.connect(function (err){
		if(err){
            //log error 
			console.log(err);
        }
	});
	next();
});

/* GET api listing. */

router.post('/data', (req, res) => {
    let query = req['body']['query'];
    connectDB(query, sendResponse, res);      
});

router.post('/grades/add/:id', (req, res) => {
    console.log(req.body);
    let query = "UPDATE Grade SET name = \""+req.body.name+"\", description = \""+req.body.description+"\" WHERE idGrade = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/grades/add/', (req, res) => {
    console.log(req.body);
    let query = "INSERT INTO Grade ('name', 'description') VALUES (\""+req.body.name+"\",\""+requ.body.description+"\")";
    connectDB(query, sendResponse, res);      
});

router.get('/umpires/add/:id', (req, res) => {
    let query = 'SELECT * FROM Umpire WHERE idUmpire = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/umpires', (req, res) => {
    let query = 'SELECT u.idUmpire as id, u.givenName, u.familyName, a.level FROM Umpire AS u ' +
        'INNER JOIN AccreditedUmpire AS au ON au.Umpire_idUmpire = u.idUmpire ' +
        'INNER JOIN Accreditation AS a ON a.idAccreditation = au.Accreditation_idAccreditation ' +
        'GROUP by u.familyName, u.givenName, a.level';
    connectDB(query, sendResponse, res);
});

router.get('/accredUmpire/:id', (req, res) => {
    let query  = 'SELECT * from AccreditedUmpire WHERE Umpire_idUmpire = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/accreditation', (req, res) => {
    let query ='SELECT * FROM Accreditation';
    connectDB(query, sendResponse, res);
});

router.get('/clubs', (req, res) => {
    let query = 'SELECT * FROM Club ORDER BY name';
    connectDB(query, sendResponse, res);
});

router.get('/clubs/add/:id', (req, res) => {
    let query = 'SELECT * FROM Club WHERE idClub = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/modules', (req, res) => {
    let query = "SELECT * FROM Modules WHERE enabled = true ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/venues', (req, res) => {
    let query = "SELECT * FROM Venue ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/venues/add/:id', (req, res) => {
    let query = 'SELECT * FROM Venue WHERE idVenue = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/grades', (req, res) => {
    let query = "SELECT * FROM Grade ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/grades/add/:id', (req, res) => {
    let query = 'SELECT * FROM Grade WHERE idGrade = '+req.params.id;
    connectDB(query, sendResponse, res);
});

function sendResponse(error, results, res){
    let rows = [];
        if(error){
            console.log(error);
        }else if (results.length>0){
            Object.values(results).forEach((element, index, array)=>{
                el = new Object();
                for(i in element){
                    el[i] = element[i];
                }
                rows.push(el);
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(rows);
        }else{ res.send();}
}

function connectDB(query, callback, res){
    connection.query(query, function (error, results, fields) {
        console.log(query);
        if(error) {
            callback(error, null, res);
        }else{   
            callback(null, results, res);
        }
    });

    connection.end(function(err){
        //log error here also.
        if(err) throw err;
    });
}

module.exports = router;