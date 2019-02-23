require('dotenv').config({ silent: true });
const ENV = process.env.ENV || "development";

// http and https server setup
const http = require('http');
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const path = require('path');
const api = require("./src/api");


// utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');

// middlewares setup
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));


app.get("*", (req, res, next) => {
	res.sendFile(path.join(__dirname, 'build/index.html'));
});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3000);
});