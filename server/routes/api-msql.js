const express = require('express');
const router = express.Router();
const database = require('./mySQL-manager.js');
module.exports = router;

var connection = null;

/* Setup connection to MySQL DB */
router.use(function(req, res, next){
	connection = database.getConnecion();
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
                venue_idVenue = \""+req.body.idVenue+"\" \
                WHERE idClub = "+req.params.id;
    connectDB(query, sendResponse, res);      
});

router.post('/clubs/add/', (req, res) => {
    let query = "INSERT INTO Club (name, address,venue_idVenue) \
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
                  DELETE FROM AccreditedUmpire WHERE `umpire_idUmpire`="+req.params.id+"; \
                  SET @idUmpire = "+req.params.id+"; \
                  INSERT INTO AccreditedUmpire (accreditation_idAccreditation, umpire_idUmpire) \
                  VALUES "+req.body.accreditationClause+";"; 
    connectDB(query, sendResponse, res);

});

router.post('/umpires/add/', (req, res) => {
    let query = "INSERT INTO Umpire (givenName, familyName, mobile, email, idEmployee) VALUES( \
    \""+req.body.givenName+"\",\""+req.body.familyName+"\", \
    \""+req.body.mobile+"\",\""+req.body.email+"\", NULL); \
                  SET @idUmpire = LAST_INSERT_ID();\
                  INSERT INTO AccreditedUmpire (accreditation_idAccreditation, umpire_idUmpire) \
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

router.get('/fixtures', (req, res) => {
    let query = 'SELECT * FROM Fixture ORDER BY round_idRound';
    connectDB(query, sendResponse, res);
});

router.get('/fixtures/:id', (req, res) => {
    let query = 'SELECT * FROM Fixture WHERE idFixture = '+req.params.id;
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

/* Gets all grades for a team */
router.get('/grades/teams/:id', (req, res) => {
        let query = 'SELECT Grade.name as grade, Club.name AS club FROM Grade \
                        INNER JOIN Team ON Grade.idGrade = Team.grade_idGrade \
                        AND Team.club_idClub = '+req.params.id 
                        'INNER JOIN Club ON Club.idClub = '+req.params.id;
});

router.get('/modules', (req, res) => {
    	let query = "SELECT * FROM Modules WHERE enabled = true ORDER BY name";
    	let result = database.getModules();
    //connectDB(query, sendResponse, res);
});

router.get('/rounds', (req, res) => {
    let query = 'SELECT * FROM Round ORDER BY idRound';
    connectDB(query, sendResponse, res);
});

router.get('/rounds/:id', (req, res) => {
    let query = 'SELECT * FROM Round WHERE idRound = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/seasons', (req, res) => {
    let query = "SELECT * FROM Season ORDER BY yearStart";
    connectDB(query, sendResponse, res);
});

router.get('/seasons/:id', (req, res) => {
    let query = 'SELECT * FROM Season WHERE idSeason = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('teams', (req, res) => {
        let query = 'SELECT Club.name, Grade.name FROM Club \
                        LEFT OUTER JOIN Team ON Club.idClub = Team.club_idClub \
                        LEFT OUTER JOIN Grade ON Team.grade_idGrade = Grade.idGrade';
});

/*Gets all teams for a grade*/
router.get('teams/grades/:id', (req, res) => {
        let query = 'SELECT Club.name as club, Grade.name AS grade FROM Club \
                        INNER JOIN Team ON Club.idClub = Team.club_idClub \
                        AND Team.grade_idGrade = '+req.params.id 
                        'INNER JOIN Grade ON Grade.idGrade = '+req.params.id;
});


router.get('/umpires/:id', (req, res) => {
    let query = 'SELECT * FROM Umpire WHERE idUmpire = '+req.params.id;
    connectDB(query, sendResponse, res);
});

router.get('/umpires', (req, res) => {
    let query = 'SELECT u.idUmpire as id, u.givenName, u.familyName, a.level FROM Umpire AS u ' +
        'INNER JOIN AccreditedUmpire AS au ON au.umpire_idUmpire = u.idUmpire ' +
        'INNER JOIN Accreditation AS a ON a.idAccreditation = au.accreditation_idAccreditation ' +
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
