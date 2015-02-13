define([
	'./BaseView',
	'text!../templates/search.html'
],
function(
	BaseView,
	SearchTpl
) {

	var ItemDetailsView = BaseView.extend({

		tagName: 'form',

		attributes: {
			class: 'pull-right'
		},

		template: SearchTpl,

		events: {
			'submit': 'onSearch'
		},

		initialize: function() {
			_.bindAll(this, 'onSearch');
		},

		onSearch: function(e) {
			this.options.route.navigate(["flickr/search/", this.$('input[name="search"]').val()].join(''), {trigger: true});
			return false;
		},

		setTerm: function(searchTerm) {
			this.$('input[name="search"]').val(searchTerm);
		}

	});

	return ItemDetailsView;
});