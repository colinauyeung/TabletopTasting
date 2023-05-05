
The idea of this project is to be able to augment physical objects in a livestream using OBS and green screening. Once setup, html elements can be tracked onto physical objects to allow them to followed around on the stream.


## Setup

First we'll need to setup the webcam and OBS prior to using the system. You'll need a webcam and a green (screen) sheet. The green (screen) sheet will be your working surface where html objects will be projected and tracked on to.

You'll want to have the green sheet be as square as possible in the webcam, while the tracking is able to correct for skew, you can't really correct for the skew on the OBS side, so it will look off if it's too skewed.

On the OBS side of the house, you're going to need two instances of OBS open. We're going to use  the first instance of OBS just for virtual camera (because we'll need to feed the webcam data to two places, the tracking software and the livestream). 

>So on the first OBS, add a video capture device and select the webcam. All we'll do here is make it the full canvas and then turn on OBS virtual camera.
>
>On the second OBS, you'll need to add a new scene and add a video capture device, but this time select the OBS virtual camera. From here, add a new filter -> chroma key. You'll want to mess with this till the green (screen) sheet disappears

## Launching the Electron App

First you'll need to grab the twitch emotes for the current version of the code, so run getTwitchemotes.py first with Python 3. This will create a folder and download all the twitch emotes into that folder.
  
To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
npm install

# Run the app
npm start
```

When launched the electron program will generate three windows

- Main Window
	- This window control handles the tracking code. One of the first you'll need to do with this window is grab the deviceID of the OBS virtual camera. Open the dev tools from the view menu and then click the button "Show Media". You'll need to dig through the json that it outputs for the OBS virtual camera. copy it's deviceID and update the id in the source code.
	- Once you've done that, you'll be able to start the camera (check to see if that works).
	- We'll take about setting up the track in a little bit
- Tabletop
	- This shows the html elements that are tracked to the objects and underneath those objects. What you'll want to do is to add a window capture in livestream OBS of this window and stick it underneath the camera feed and track to match up the blue area of the window as closely as possible with the green screen hole
	- This one is currently setup to add links that are posted to a connected twitch as link previews
- Tabletop2
		- Same as Tabletop, but for elements on top of physical objects. Also add it to the livestream OBS, but stick it on top of the camera feed and match it up to the green screen area. You'll also want to stick a chroma key on this one to get rid of the blue background
		- This one currently adds emote effects from chat

### Tracking 
  
To do tracking you'll need a bunch of ARuco; 4 for each of the corners of the tracking area and 2 for the things you want to track. The markers you'll want
- 816: top left corner
- 603: bottom left corner
- 912: top right corner
- 722: bottom right corner
- 502: object 1
- 887: object 2

What you'll want to do is place each the bounding box aruco markers such that their center's are on the corners of the tracking area. Then you can start the camera on the main window and everything should start tracking.

For a little bit of context into how the tracking works, the basic idea is that the tracking algorithm assumes that the markers are located at the corners of the green sheet which is rectangular and that those corners are also matching the corners of the tabletop windows' blue area. This means that even if the corners are skewed, they should represent a rectangle. So given a marker within these markers, we can do math to translate from it's position within the markers to a position within the fixed rectangle of the tabletop window.

## Working with the code base

To make changes to the code base, the following function is located in these locations

Tracking is contained in
    Controls + Tracking Loop -> control_window/renderer.js
    Tracking Behaviour -> modules/vision.js
    Math for transformations -> modules/pointmath.js

Any data you want to grab and send to the windows from outside the program
    main.js

Foreground html elements (currently link previews)
    tablewindow/renderer.js

Background html elements (currently emotes)
    tablewindow2/renderer/js

