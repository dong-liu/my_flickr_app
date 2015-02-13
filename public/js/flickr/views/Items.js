define([
	'backbone',
	'./Item'
],
function(
	Backbone,
	ItemView
) {

	/**
	 * ItemsView Class
	 * @type {[type]}
	 */
	var ItemsView = Backbone.View.extend({

		views: {
			// Item Views cache
			items: {}
		},

		tagName: 'ul',

		attributes: {
			className: "thumbnails"
		},

		render: function() {
			var item;
			this.$el.html('');
			if (this.options && this.options.hasOwnProperty('collection')) {
				this.options.collection.each(function(model) {
					itemView = new ItemView({
						model: model
					});
					this.views.items[itemView.cid] = itemView;
					this.$el.append( itemView.render().el );
				}, this);
			}
			return this;
		}

	});

	return ItemsView;
});