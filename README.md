# Flickr API application

This is an application, which is consuming Flickr public feed and performs basic tag based search of images.


## Requirements

* Create an app to consume a [Public JSON Free Feed](http://api.flickr.com/services/feeds/photos_public.gne?tags=dog&tagmode=all&format=json&jsoncallback=?) ([documentation](http://www.flickr.com/services/feeds/docs/photos_public/)) and display the resulting data.
* The site functions as a single-page application
* Layout is very simple, listing all the images with the tag "dog". 
* You can change the default searching tag to whatever you want in /my_flickr_app/public/js/config.js.
* Or, after the result page is loaded, type whatever tags you want to search in the search box at the top-right corner.
* In the result page, clicking on the word "Author" to the right side of the thumbnail will give you the list of photos that are taken by the same person.
* You can choose to open the photo in the current browser or "view on Flickr" which will open a new tab with that photo.
* The site uses responsive techniques to ensure it works on a range of devices
* Tests (unit tests)


## Technologies

* Node - server side
* Backbone.js - front-end, MVC like style
* Bower - frontend dependency management
* Require - dependency management
* Grunt - build
* Flickr Public Feed
* Compass - preprocessor
* Karma - testing

## Instructions

Install dependencies:
	$ npm install
	$ bower install

Starting the app:
	$ npm start
	
Browsing the photos:
	Type "localhost:3000" in any browser you choose	

Tests:
	$ npm test
	
	* A log file 'test-results.xml' under /my_flickr_app folder will be created
	* The output is also displayed in the console
	* [Todo] Even the application is fully functional, you will see some errors in the console when testing. Will clean them out in the next day or two. 	

## Author

Dong Liu
Sep 25, 2014
