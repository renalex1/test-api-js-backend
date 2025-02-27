const config = require("./config.global");

config.jwt.secretKey = "jwt-secretKey";
config.jwt.verify.maxAge = 604800;

module.exports = config;
