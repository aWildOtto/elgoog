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
	res.sendFile(path.join(__dirname, '../FE/index.html'));
});


app.post("/search", (req, res, next) => {
	//open browser
	console.log(req.body);
	var searchPromise = (async function searchKey() {
		let driver = await new Builder().forBrowser('chrome').build();
		driver.manage().window().maximize();
		await driver.get('http://www.google.com/');
		await driver.findElement(By.name('q')).sendKeys(req.body.searchKey, Key.RETURN);
		return driver.wait(until.titleIs(req.body.searchKey + ' - Google Search'));
	})();
	searchPromise.then(() => {
		// call photo api
		axios.post('https://c505095d.ngrok.io/photo')
			.then(response => {
				// console.log(response.data);
				var buff = new Buffer(response.data, 'base64');
				fs.writeFileSync('public/resultPhoto.jpg', buff);
				var resultText = "sadfsdf";
				var promise = (async function convertToText() {
					let driver = await new Builder().forBrowser('chrome').build();
					driver.manage().window().maximize();
					await driver.get('https://www.onlineocr.net/');
					var fullPath = __dirname + "/public/resultPhoto.jpg";
					await driver.findElement(By.id('fileupload')).sendKeys(fullPath);
					await driver.wait(until.elementIsEnabled(driver.findElement(By.css("input[type='submit']"))));
					await driver.findElement(By.css("input[type='submit']")).click();
					await driver.wait(until.elementLocated(By.id("MainContent_txtOCRResultText")));
					await driver.findElement(By.id("MainContent_txtOCRResultText")).getText().then(text => {
						console.log(text);
						resultText = text;
					});
					return driver.quit();
				})();
				promise.then(() => {
					res.status(200).send(resultText);
				})
			})
			.catch(error => {
				console.log(error);
			});
	});

	// return photo to client
	// console.log(req.body);

});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3000);
});