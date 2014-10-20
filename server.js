var connect = require('connect');
var servestatic = require('serve-static');
connect().use(servestatic(__dirname)).listen(8080);