define([
    'jquery',
    'flickr/main'
], function(
    $,
    FlickrRouter
){

	var onDOMReady = function() {
		URL.routers = {
			FlickrRouter: new FlickrRouter({
				$el: $('section.canvas'),
				$search: $('section.search')
			})
		};
	};

    $(document).ready(onDOMReady);

    Backbone.history.start();

});