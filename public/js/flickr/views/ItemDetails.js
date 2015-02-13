define([
	'./Item',
	'text!../templates/item_details.html'
],
function(
	ItemView,
	ItemDetailsTpl
) {

	var ItemDetailsView = ItemView.extend({

		tagName: 'article',

		attributes: {
			class: "thumbnail details url-clearfix"
		},

		template: ItemDetailsTpl,

		events: {
			'click .btn.back': 'goBack'
		},

		goBack: function() {
			window.history.back();
			return false;
		}

	});

	return ItemDetailsView;
});