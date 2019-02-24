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

app.use(express.static("./"));

app.get("*", (req, res, next) => {
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
		}

	});
	res.send("hello");//change to picture url later on

	// fs.rename(loc + , 'newFile.txt', (err) => {
	// 	if (err) throw err;
	// 	console.log('Rename complete!');
	// });
	// var file = object.GetFile(loc + "resultPhoto.jpg");
	// loc = path.dirname("resultPhoto.jpg").split(path.sep).pop();
	// file.Move(loc);
	// var Webcam = NodeWebcam.create(opts);
	//Will automatically append location output type
	// Webcam.capture("resultPhoto", function( err, data ) {} );
	//Also available for quick use
	// NodeWebcam.capture( "resultPhoto", opts, function( err, data ) {
	// });
	//Get list of cameras
	// Webcam.list( function( list ) {
	// 	//Use another device
	// 	var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
	// });
	//Return type with base 64 image
	// var opts = {
	// 	callbackReturn: "base64"
	// };
	// NodeWebcam.capture( "resultPhoto", opts, function( err, data ) {
	// 	var image = "<img src='" + data + "'>";
	// });
});

httpServer.listen(process.env.PORT || 3001, () => {
	console.log('Server running at localhost:' + process.env.PORT);
});