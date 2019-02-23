require('dotenv').config({ silent: true });
const ENV = process.env.ENV || "development";

// http and https server setup
const http = require('http');
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const path = require('path');


// utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');

// middlewares setup
app.use(morgan('dev'));


app.get("*", (req, res, next) => {
	res.sendFile(path.join(__dirname, '../FE/BBE.html'));
});

app.get("/photo", (req, res, next) => {

});

httpServer.listen(process.env.PORT || 3001, () => {
	console.log('Server running at localhost:' + process.env.PORT);
});