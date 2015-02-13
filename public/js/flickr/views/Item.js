define([
	'./BaseView',
	'moment',
	'text!../templates/item.html'
],
function(
	BaseView,
	moment,
	ItemTpl
) {

	var ItemView = BaseView.extend({

		tagName: 'li',

		template: ItemTpl
		
	});

	return ItemView;
});