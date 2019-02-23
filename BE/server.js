require('dotenv').config({ silent: true });
const ENV = process.env.ENV || "development";

// http and https server setup
const http = require('http');
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');

// utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');

// middlewares setup
app.use(morgan('dev'));


app.get("/", (req, res, next) => {
	(async function example() {
		let driver = await new Builder().forBrowser('chrome').build();
		await driver.get('http://www.google.com/');
		await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
		await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
	})();
	console.log(req.body);
	res.sendFile(path.join(__dirname, '../FE/index.html'));
});

app.get("/search", (req, res, next) => {
	//open browser 
	console.log(req.body);

	// call photo api
	// return photo to client 
});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3000);
});