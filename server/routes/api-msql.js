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

/*
 ******************************POST API*************************************
*/

router.post('/accreditations/add/:id', (req, res) => {
    console.log(req.body);
    let query = "UPDATE Accreditation SET level = \""+req.body.level+"\", description = \""+req.body.description+"\" WHERE idAccreditation = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/accreditations/add/', (req, res) => {
    console.log(req.body);
    let query = "INSERT INTO Accreditation (level, description) \
                VALUES (\""+req.body.level+"\",\""+req.body.description+"\")";
    connectDB(query, sendResponse, res);      
});

router.post('/accreditations/delete/:id', (req, res) => {
    let query = "DELETE FROM Accreditation WHERE idAccreditation = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/clubs/add/:id', (req, res) => {
    let query = "UPDATE Club SET name = \""+req.body.name+"\", \
                address = \""+req.body.address+"\", \
                Venue_idVenue = \""+req.body.idVenue+"\" \
                WHERE idClub = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/clubs/add/', (req, res) => {
    let query = "INSERT INTO Club (name, address,Venue_idVenue) \
                VALUES (\""+req.body.name+"\",\""+req.body.address+"\","+req.body.idVenue+")";
    connectDB(query, sendResponse, res);      
});

router.post('/clubs/delete/:id', (req, res) => {
    let query = "DELETE FROM Club WHERE idClub = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/grades/add/:id', (req, res) => {
    let query = "UPDATE Grade SET name = \""+req.body.name+"\", description = \""+req.body.description+"\" WHERE idGrade = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/grades/add/', (req, res) => {
    let query = "INSERT INTO Grade (name, description) VALUES (\""+req.body.name+"\",\""+req.body.description+"\")";
    connectDB(query, sendResponse, res);      
});

router.post('/grades/delete/:id', (req, res) => {
    let query = "DELETE FROM Grade WHERE idGrade = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/umpires/add/:id', (req, res) => {
    let query = "UPDATE `Umpire` SET `familyName`=\""+req.body.familyName+"\"" + 
                  ",`givenName`=\""+req.body.givenName+"\"" +
                  ",`mobile`=\""+req.body.mobile+"\"" + 
                  ",`email`=\""+req.body.email+"\"" + 
                  " WHERE `idUmpire`="+req.params.id+"; \
                  DELETE FROM AccreditedUmpire WHERE `Umpire_idUmpire`="+req.params.id+"; \
                  SET @idUmpire = "+req.params.id+"; \
                  INSERT INTO AccreditedUmpire (Accreditation_idAccreditation, Umpire_idUmpire) \
                  VALUES "+req.body.accreditationClause+";"; 
    connectDB(query, sendResponse, res);

});

router.post('/umpires/add/', (req, res) => {
    let query = "INSERT INTO Umpire (givenName, familyName, mobile, email, idEmployee) VALUES( \
    \""+req.body.givenName+"\",\""+req.body.familyName+"\", \
    \""+req.body.mobile+"\",\""+req.body.email+"\", NULL); \
                  SET @idUmpire = LAST_INSERT_ID();\
                  INSERT INTO AccreditedUmpire (Accreditation_idAccreditation, Umpire_idUmpire) \
                  VALUES "+req.body.accreditationClause+";";  
    connectDB(query, sendResponse, res);

});

router.post('/umpires/delete/:id', (req, res) => {
    let query = "DELETE FROM Umpire WHERE idUmpire = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/umpires/umpire-types/umpire-type/add/:id', (req, res) => {

});

router.post('/umpires/umpire-types/umpire-type/add/', (req, res) => {

});

router.post('/umpires/umpire-types/umpire-type/delete/:id', (req, res) => {
     
});

router.post('/venues/add/:id', (req, res) => {
    let query = "UPDATE Venue SET name = \""+req.body.name+"\", address = \""+req.body.address+"\" WHERE idVenue = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/venues/add/', (req, res) => {
    let query = "INSERT INTO Venue (name, address) VALUES (\""+req.body.name+"\",\""+req.body.address+"\")";
    connectDB(query, sendResponse, res);      
});

router.post('/venues/delete/:id', (req, res) => {
    let query = "DELETE FROM Venue WHERE idVenue = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

/*
 ******************************GET API*************************************
*/

router.get('/accreditations', (req, res) => {
    let query ='SELECT * FROM Accreditation';
    connectDB(query, sendResponse, res);
});

router.get('/accreditations/:id', (req, res) => {
    let query = 'SELECT * FROM Accreditation WHERE idAccreditation = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/accreditations/umpire/:id', (req, res) => {
    let query = 'SELECT * FROM AccreditedUmpire WHERE Umpire_idUmpire = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/accredUmpire/:id', (req, res) => {
    let query  = 'SELECT * from AccreditedUmpire WHERE Umpire_idUmpire = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/clubs', (req, res) => {
    let query = 'SELECT * FROM Club ORDER BY name';
    connectDB(query, sendResponse, res);
});

router.get('/clubs/:id', (req, res) => {
    let query = 'SELECT c.*, v.name as venueName, v.idVenue, v.address as venueAddress \
        FROM Club AS c LEFT JOIN Venue as v \
        ON c.venue_idVenue = v.idVenue WHERE idClub = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/grades', (req, res) => {
    let query = "SELECT * FROM Grade ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/grades/:id', (req, res) => {
    let query = 'SELECT * FROM Grade WHERE idGrade = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/modules', (req, res) => {
    let query = "SELECT * FROM Modules WHERE enabled = true ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/umpires/:id', (req, res) => {
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

router.get('/umpires/umpire-types/:id', (req, res) => {
    let query = 'SELECT * FROM Type WHERE idType = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/umpires/umpire-types', (req, res) => {
    let query = 'SELECT * FROM Type';
    connectDB(query, sendResponse, res);
});

router.get('/venues', (req, res) => {
    let query = "SELECT * FROM Venue ORDER BY name";
    connectDB(query, sendResponse, res);
});

router.get('/venues/:id', (req, res) => {
    let query = 'SELECT * FROM Venue WHERE idVenue = '+req.params.id;
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