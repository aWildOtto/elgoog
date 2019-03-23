# elgooG: Mountain Madness Hackathon 2019 Project
Google chrome is a best search engine, but what if you are tired of using it and want to try something different.
It is a nightmare when you are lying on the bed and want to do some searches. Now, you have a new tool to do that without using Google on your phone.

## So, What is it?
It is an overcomplicated *search* app made to compete for the topic described below:

## Hackathon topic: The Rubey
Rube Goldberg machines are overcomplicated systems that perform simple functions. The top prize awarded at Mountain Madness is the Rubey, won by the most impressively overengineered project that still manages to perform a useful task.

What we hope to see from submissions for the Rubey are impressive technological accomplishments applied to silly or trivial uses. Some examples and inspiration:

* A magic eight-ball program that, given a query, simulates a large network and runs a distributed consensus algorithm to arrive at its answer
* The echo command line tool, but each character is printed by a new Docker container
* Shazoom—an iPhone app that builds an Android virtual machine, installs Shazam on it, and then runs Shazam on the virtual machine

This is the perfect opportunity to try out your favourite solution that you don't have a problem for! If you are competing for this prize, come up with your idea quickly and run it by the organizers to make sure it has merit.

## How it works
The app is composed of a web front-end and two nodejs back-ends. 
1. A user types a keyword on the search bar in a browser (front-end).
2. The keywords sends back to Back-end#1(BE1), then it opens up a browser with selenium and searches the same keyword on google. 
3. BE1 then sends a post request to Back-end#2(BE2) and tell BE2 to take a picture of BE1's screen (yes, for this to work, we need two laptops running the two BEs and placed them face to face). 
4. BE2 sends the picture back to BE1, which processes the picture taken in https://www.onlineocr.net/ and records the result.
5. BE1 extracts the text from the picture, and sends both the picture and text to the font-end.
6. Users can enjoy the super helpful elgooG result.

## Setup
1. Run *npm install* in both BE and BBE(Backend of BE) directory.
2. Add .env in both BE and BBE directory and put PORT=SOMEPORT#.
3. In BE/server.js change the url in line 40 to whereever BBE is hosted at.
4. Run *npm start* in both BE and BBE.

## Todo
1. Use OCR(**O**ptical **C**haracter **R**ecognition) to recognize text.
* Use OpenCV to find ROI(**R**egion **O**f **I**nterest).
* Train our own model to classify characters. Since all characters are typed, not hand written, it is easy to collect data and recognize them.
2. Use Google Search API to send Http request to get results.
