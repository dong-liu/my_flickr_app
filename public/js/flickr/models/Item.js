define([
	'backbone',
	'../config'
],
function(
	Backbone,
	config
) {

	var ItemModel = Backbone.Model.extend({

		parse: function(response) {
			// Expose extra properties used within the application
			response.published_formatted = moment( response.published ).format(config.dateFormat);
			// if the title is less than 16 characters long, use the title directly; otherwise, truncate it.
			response.title_trunc = response.title.length < 16 ? response.title : response.title.substring(0, 16) + "...";
			response.fileName = this.getLastSegment(response.media.m);
			response.tagsArray = response.tags.split(' ');

			return response;
		},

		getFileName: function() {
			var fileName = '';
			if (this.get('media') && this.get('media')) {
				fileName = this.getLastSegment(this.get('media').m);
			}
			return fileName;
		},

		getLastSegment: function(url) {
			return url.split('/').pop();
		}

	});

	return ItemModel;
});