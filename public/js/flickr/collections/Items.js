define([
	'backbone',
	'../models/Item',
	'../config'
],
function(
	Backbone,
	ItemModel,
	configuration
) {

	var FlickrItemsCollection = Backbone.Collection.extend({

		// Base service API to be used internallly
		rootApiService: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',

		model: ItemModel,

		/**
		 * Initialization function
		 * @param  {[Object]} options options object used primarily for Flicker API serach service customization.
		 *  It''s an object that supports properties listed on this page http://www.flickr.com/services/feeds/docs/photos_public/
		 *  { tags: 'dog,company' }
		 */
		initialize: function(models, options) {
			_.bindAll(this, 'onBeforeSend', 'onComplete');

			// Set options used internally
			this.options = options || {};

			$.ajaxSetup({
				beforeSend: this.onBeforeSend,
				complete: this.onComplete
			});
		},

		/**
		 * Custom url builder function - implementing Flickr specific API search.
		 *
		 * @see Flickr specific API search - http://www.flickr.com/services/feeds/docs/photos_public/
		 * @param  {[Object]} fitler used for filtering Flicker API service
		 * @return {[String]} genrated url string used for the API call
		 */
		url: function() {
			var url = this.rootApiService;

			if (this.options && this.options.hasOwnProperty('filter')) {
				if (this.options.filter.tags) {
					// tags (Optional) - A comma delimited list of tags to filter the feed by.
					url = [url, 'tagmode=all', 'tags='+this.options.filter.tags].join('&');
				}
			}

			return url;
		},

		sync: function(method, model, options) {
			return $.ajax(
				_.extend({
					dataType: 'jsonp',
					url: this.url(),
					processData: false
				}, options)
			);
		},


		parse: function(response) {
			return response.items;
		},

		/**
		 * Finds the item whose file name is equal to provided file name.
		 * @param  {String} fileName file name of an item to find
		 * @return {Item}          found Item model instance
		 */
		getByFileName: function(fileName) {
			return this.find(function(item) { return fileName === item.getFileName(); });
		},

		/**
		 * Method responsible for setting filter to be used fo data retrieval.
		 * @param  {String} filter json based filter object used internally for searching flicker API (within url method)
		 * @return {ItemVeew} instance of this class to support chaining
		 */
		setFilter: function(filter) {
			this.options.filter = filter;
			return this;
		},

		getFilter: function() {
			return this.options.filter || {};
		},

		onBeforeSend: function() {
			this.trigger('fetch:start');
		},

		onComplete: function() {
			this.trigger('fetch:end');
		}

	});

	return FlickrItemsCollection;

});