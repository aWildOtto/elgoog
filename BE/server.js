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
	(async function searchKey() {
		let driver = await new Builder().forBrowser('chrome').build();
		driver.manage().window().maximize();
		await driver.get('http://www.google.com/');
		await driver.findElement(By.name('q')).sendKeys(req.body.searchKey, Key.RETURN);
		await driver.wait(until.titleIs('webdriver - Google Search'));
	})();
	// call photo api
	axios.post('http://localhost:8081/photo')
		.then(response => {
			// console.log(response.data);
			var buff = new Buffer(response.data, 'base64');
			fs.writeFileSync('public/resultPhoto.jpg', buff);
			(async function convertToText() {
				let driver = await new Builder().forBrowser('chrome').build();
				driver.manage().window().maximize();
				await driver.get('https://www.onlineocr.net/');
				var fullPath = __dirname + "/public/test.jpg";
				await driver.findElement(By.id('fileupload')).sendKeys(fullPath);
				await driver.wait(until.elementIsEnabled(driver.findElement(By.css("input[type='submit']"))));
				await driver.findElement(By.css("input[type='submit']")).click();
				await driver.wait(until.elementLocated(By.id("MainContent_txtOCRResultText")), 10000);
				await driver.findElement(By.id("MainContent_txtOCRResultText")).getText().then(text => {
					console.log(text);
				});
				res.status(200).send(text);
			})();
		})
		.catch(error => {
			console.log(error);
		});
	// return photo to client
	// console.log(req.body);

});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3000);
});