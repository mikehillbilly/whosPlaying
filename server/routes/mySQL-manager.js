const Sequelize = require('sequelize');
var connection = null;
var Modules;

var exports = module.exports = {};

exports.getConnecion = function(){
	return connection;
}

exports.connect = function(){
//database wide options
	var opts = {
		host: 'ec2-52-64-215-106.ap-southeast-2.compute.amazonaws.com',
	  	dialect: 'mysql',
	  	pool: {
	    	max: 5,
	    	min: 0,
	    	acquire: 30000,
	    	idle: 10000
	  	},
	    define: {
	        //prevent sequelize from pluralizing table names
	        freezeTableName: true
	    }
	}
	connection = new Sequelize('SANFLFixtures', 'mike', 'sanfl', opts);
  	connection.authenticate().then(()=>{
  		console.log("Successfully connected to database");
  	}).catch(err=>{
  		console.error("Failed to connect to database: ", err);
  	});
}

exports.getModules = function(){
	var modules = Modules.findAll().then(results=>{
		console.log(results[0]);
	});
	return modules;
}

exports.createDatabase = function(){
	var Accred = connection.define('Accred', {
  		idAccred: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		level: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		},
  		description: {
  			type: Sequelize.STRING
  		} 
	});

	var AccredUmpire = connection.define('AccredUmpire', {
  		idAccredUmpire: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	var Club = connection.define('Club', {
  		idClub: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		name: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		},
  		address: {
  			type: Sequelize.STRING
  		},
  		logo: {
  			type: Sequelize.STRING,
  			unique: true
  		}
	});

	var Fixture = connection.define('Fixture', {
  		idFixture: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	var FixTimeVen = connection.define('FixTimeVen', {
  		idFixTimeVen: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		date:{
  			type: Sequelize.DATEONLY
  		},
  		time:{
  			type: Sequelize.TIME
  		}
	});

	var Grade = connection.define('Grade', {
  		idGrade: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		name: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		},
  		description: {
  			type: Sequelize.STRING
  		}
	});

	var GradeTypeAccred = connection.define('GradeTypeAccred', {
  		idGradeTypeAccred: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	Modules = connection.define('Modules', {
  		idModule: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		name: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		},
  		url: {
  			type: Sequelize.STRING,
  			unique: true
  		},
  		enabled: {
  			type: Sequelize.BOOLEAN
  		},
  		outlet: {
  			type: Sequelize.STRING,
  			unique: true
  		}
	});

	var Round = connection.define('Round', {
  		idRound: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		round: {
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		}
	});

	var Season = connection.define('Season', {
  		idSeason: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		description: {
  			type: Sequelize.STRING,
  			unique: true,
  		},
  		yearStart: { 
  			type: Sequelize.DATEONLY,
  			notNull: true
  		},
  		endStart: {
  			type: Sequelize.DATEONLY
  		}
	});

	var Team = connection.define('Team', {
  		idTeam: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	// Types of Umpire
	var Type = connection.define('Type', {
  		idType: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		type: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		}
	});

	var Umpire = connection.define('Umpire', {
  		idUmpire: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		familyName: { 
  			type: Sequelize.STRING,
  			notNull: true,
  			notEmpty: true
  		},
  		givenName: { 
  			type: Sequelize.STRING,
  			notNull: true,
  			notEmpty: true
  		},
  		email: {
  			type: Sequelize.STRING,
  			notNull: true,
  			notEmpty: true,
  			unique: true,
  			isEmail: true
  		},
  		mobile: {
  			type: Sequelize.STRING,
  			unique: true,
  			validate: {
  				is: '^\+(?=\d{5,15}$)(1|2[078]|3[0-469]|4[013-9]|5[1-8]|6[0-6]|7|8[1-469]|9[0-58]|[2-9]..)(\d+)$'
  			}
  		}
	});

	/* What umpires are allocted to a fixture*/
	var UmpireFixture = connection.define('UmpireFixture', {
  		idUmpireFixture: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	/*Umpires can be many type of umpire*/
	var UmpireType = connection.define('UmpireType', {
  		idUmpireType: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		}
	});

	var Venue = connection.define('Venue', {
  		idVenue: {
  			type: Sequelize.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		name: { 
  			type: Sequelize.STRING,
  			unique: true,
  			notNull: true
  		},
  		address: {
  			type: Sequelize.STRING
  		}
	});

	var VenueClub = connection.define('VenueClub', {
		idVenueClub: {	
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	/* Associations between tables */
	Fixture.belongsTo(Team, {foreignKey: 'homeTeam_idTeam'}); // FK created in Fixture
	Fixture.belongsTo(Team, {foreignKey: 'awayTeam_idTeam'});
	Fixture.belongsTo(FixTimeVen, {foreignKey: 'fixTimeVen_idFixTimeVen'});
	Fixture.belongsTo(Grade, {foreignKey: 'grade_idGrade'});
	Fixture.belongsTo(Round, {foreignKey: 'round_idRound'});

	FixTimeVen.belongsTo(Venue, {foreignKey: 'venue_idVenue'});
	Umpire.belongsToMany(Accred, {through: 'AccredUmpire', foreignKey: 'umpire_idUmpire'});
	Accred.belongsToMany(Umpire, {through: 'AccredUmpire', foreignKey: 'accred_idAccred'});

	Type.belongsToMany(Grade, {through: 'GradeTypeAccred', foreignKey: 'type_idType'});
	Grade.belongsToMany(Type, {through: 'GradeTypeAccred', foreignKey: 'grade_idGrade'});
	Accred.belongsToMany(Grade, {through: 'GradeTypeAccred', foreignKey: 'accred_idAccred'});
	Grade.belongsToMany(Accred, {through: 'GradeTypeAccred', foreignKey: 'grade_idGrade'});

	Season.hasOne(Round, {foreignKey: 'season_idSeason'});
	Grade.hasOne(Team, {foreignKey: 'grade_idGrade'});
	Club.hasOne(Team, {foreignKey: 'club_idClub'});

	Umpire.hasOne(UmpireFixture, {foreignKey: 'umpire_idUmpire'});
	FixTimeVen.hasOne(UmpireFixture, {foreignKey: 'fixTimeVen_idFixTimeVen'});
	Umpire.hasOne(UmpireType, {foreignKey: 'umpire_idUmpire'});
	Type.hasOne(UmpireType, {foreignKey: 'type_idType'});

	connection.sync();
}


