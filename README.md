# Elgoog Mountain madness hackathon 2019 project
It is a nightmare when you are lying on your bed but you want to seach some stuff on google. Now, you have a new tool to do that without using Google on your phone.

# So, What is it really?
It is an over-complicated and completely unnecessary search app made to compete for the topic described below:

## Hackathon topic: The Rubey
Rube Goldberg machines are overcomplicated systems that perform simple functions. The top prize awarded at Mountain Madness is the Rubey, won by the most impressively overengineered project that still manages to perform a useful task.

What we hope to see from submissions for the Rubey are impressive technological accomplishments applied to silly or trivial uses. Some examples and inspiration:

a magic eight-ball program that, given a query, simulates a large network and runs a distributed consensus algorithm to arrive at its answer
the echo command line tool, but each character is printed by a new Docker container
Shazoom—an iPhone app that builds an Android virtual machine, installs Shazam on it, and then runs Shazam on the virtual machine
This is the perfect opportunity to try out your favourite solution that you don't have a problem for! If you are competing for this prize, come up with your idea quickly and run it by the organizers to make sure it has merit.

## How it works
The app is composed of a web front-end and two nodejs back-ends. When user searches a keyword on the front-end, back-end#1(BE1) opens up a browser with selenium and searches the same keyword on google. BE1 then sends a post request to BE2 and tell it to take a picture of back-end#1's screen (yes, for this to work, we need two laptops running the two BEs and placed face to face). BE2 sends the picture back to BE1, which processes the picture taken in https://www.onlineocr.net/ and records the result. The picture and the text extracted from the picture are both sent back to the front-end so the user can enjoy their super helpful elgooG result.
