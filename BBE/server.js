require('dotenv').config({ silent: true });
const ENV = process.env.ENV || "development";

// http and https server setup
const http = require('http');
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const path = require('path');
const fs = require("fs");
// var firebase = require("firebase");



// utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');

// middlewares setup
app.use(morgan('dev'));

app.use(express.static("./"));

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, '../FE/BBE.html'));

});


app.post("/photo", (req, res, next) => {
	// open camera
	// take a picture
	// send back the picture
	var NodeWebcam = require("node-webcam");
	var opts = {
		width: 1920,
		height: 1080,
		quality: 100,
		//Delay to take shot
		delay: 0,
		//Save shots in memory
		saveShots: true,
		// [jpeg, png] support varies
		// Webcam.OutputTypes
		output: "jpeg",
		//Which camera to use
		//Use Webcam.list() for results
		//false for default device
		device: false,
		// [location, buffer, base64]
		// Webcam.CallbackReturnTypes
		callbackReturn: "location",
		//Logging
		verbose: false
	};
	//Creates webcam instance
	var Webcam = NodeWebcam.create(opts);
	Webcam.capture("resultPhoto", function (err, data) {
		if (!err) {
			console.log("Image created!");
			var bitmap = fs.readFileSync("./resultPhoto.jpg");
			res.send(new Buffer(bitmap).toString('base64'));//change to picture url later on
		}

	});

	// Initialize Firebase

	// var storageRef = firebase.storage().ref();

	// var file = new File([''], 'resultPhoto.jpg', {
	// 	type: "image/jpg",
	// });
	// // Create file metadata including the content type
	// var metadata = {
	// 	contentType: 'image/jpeg',
	// };

	// // Upload the file and metadata
	// var uploadTask = storageRef.child('resultPhoto.jpg').put(file, metadata);
	// uploadTask.then((result) => {
	// 	console.log(result);
	// });
});

httpServer.listen(process.env.PORT || 3001, () => {
	console.log('Server running at localhost:' + process.env.PORT || 3001);
});