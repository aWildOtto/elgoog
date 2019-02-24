require('dotenv').config({ silent: true });
const ENV = process.env.ENV || "development";

// http and https server setup
const axios = require('axios');
const http = require('http');
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

// utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');

// middlewares setup
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {

	// write data to request body
	res.sendFile(path.join(__dirname, '../FE/index.html'));
});


app.post("/search", (req, res, next) => {
	//open browser 
	console.log(req.body);
	(async function example() {
		let driver = await new Builder().forBrowser('chrome').build();
		await driver.get('http://www.google.com/');
		await driver.findElement(By.name('q')).sendKeys(req.body.searchKey, Key.RETURN);
		await driver.wait(until.titleIs('webdriver - Google Search'));
	})();
	// call photo api
	axios.post('http://localhost:8081/photo')
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	// return photo to client
	console.log(req.body);
	var buff = new Buffer(req.body, 'base64')
	fs.writeFileSync('public/resultPhoto.jpg', buff);
	res.end(200);
});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3000);
});