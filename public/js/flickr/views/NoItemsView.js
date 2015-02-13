define([
	'./BaseView',
	'text!../templates/no_items.html'
],
function(
	BaseView,
	NoItemsTpl
) {

	var NoItemsView = BaseView.extend({

		template: NoItemsTpl,

		initialize: function() {
			this.options.model = new Backbone.Model({
				message: this.options && this.options.message ? this.options.message : ''
			});
		}


	});

	return NoItemsView;
});