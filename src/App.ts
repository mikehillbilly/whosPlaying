// Get dependencies
import * as express from 'express'
import * as path from 'path'
import * as http from 'http'
import * as bodyParser from 'body-parser'
// This will return the Sequelize connection to MySQL
import * as database from './server/routes/mySQL-manager.js'

var connection = database.connect();
database.createDatabase(connection);

// Get our API routes
const api = require("./server/routes/api-msql");

class App {
	public express
	public database
	public server

	constructor(){
		this.express = express;
		this.mountRoutes();	
	}

	private mountRoutes(): void {
		const router = express.Router();
	// Parsers for POST data
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));

		// Point static path to dist
		this.express.use(express.static(path.join(__dirname, 'dist')));

		// Set our api routes
		this.express.use('/api', api);

		// Catch all other routes and return the index file
		this.express.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, 'dist/index.html'));
		});	
	}
}

export default new App().express()

