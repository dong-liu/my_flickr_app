define([
	'backbone',
	'handlebars',
	'text!../templates/base_view.html'
],
function(
	Backbone,
	Handlebars,
	BaseViewTpl
) {

	var BaseView = Backbone.View.extend({

		template: BaseViewTpl,
		
		serialize: function() {
			var context = {};
			if (this.options) {
				if (this.options.model) {
					context = this.options.model.toJSON();
				}
			}
			return context;
		},

		render: function() {
			
			if (!this.template) {
				throw Error('BaseView.render(): <template> property is required!');
			}
	        
	        // Compile the template using Handlebars, and
	        // Load the compiled HTML into the Backbone "el"
			this.$el.html(Handlebars.compile(this.template)(this.serialize()));
			return this;
		}

	});

	return BaseView;
});