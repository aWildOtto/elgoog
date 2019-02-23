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

app.use(express.static("public"));

app.get("*", (req, res, next) => {
	res.sendFile(path.join(__dirname, '../FE/BBE.html'));
});

app.post("/photo", (req, res, next) => {
	// open camera
	// take a picture
	// send back the picture 
});

httpServer.listen(process.env.PORT || 3001, () => {
	console.log('Server running at localhost:' + process.env.PORT);
});