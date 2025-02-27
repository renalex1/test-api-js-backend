const config = require("./config.global");

config.log.console = true;
config.log.debug = true;

config.sample_db = "mongodb://user:password@db_host/db_name";

config.jwt.secretKey = "jwt-test-secretKey";
config.jwt.verify.maxAge = 604800;

module.exports = config;
