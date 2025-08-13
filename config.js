var config = {
	debug: true,
	database: {
	    connectionLimit: 500,
	    host: "localhost",
	    user: "u251004295_appsend",
	    password: "***REMOVED***",
	    database: "u251004295_appsend",
	    charset : "utf8mb4",
	    debug: true,
	    waitForConnections: true,
	    multipleStatements: true
	},
	cors: {
		origin: '*',
 		optionsSuccessStatus: 200
	}
}

module.exports = config; 