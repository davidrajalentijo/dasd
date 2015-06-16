var mysql = require( 'mysql' );		// MySQL database


// db config
if (typeof(process.env.RDS_HOSTNAME) !== 'undefined') {
var env = "production";
var config = {};
config.driver = "mysql";
config.user = process.env.RDS_USERNAME;
config.database = "ebdb";
config.password = process.env.RDS_PASSWORD;
config.host = process.env.RDS_HOSTNAME;
console.log(config);
}
else
{
var env = "dev";
var config = require( './database.json' )[env];
}


var password = config.password ? config.password : null;

var pool = mysql.createPool({
	host : config.host,
	user : config.user,
	password : config.password,
	database : config.database });

exports.pool = pool;