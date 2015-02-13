define([
    'backbone',
    './config',
    './collections/Items',
    './views/Items',
    './views/ItemDetails',
    './views/NoItemsView',
    './views/Search'
],
function(
    Backbone,
    CONFIGURATION,
    FlickrItemsCollection,
    FlickrItemsView,
    FlickrItemView,
    NoItemFoundView,
    SearchView
) {


    /*
        
        Flickr API Service: http://api.flickr.com/services/feeds/photos_public.gne?tags=dog&tagmode=all&format=json&jsoncallback=?
        @documentation http://www.flickr.com/services/feeds/docs/photos_public/
        
     */
    var URLFlickrRoute = Backbone.Router.extend({

        ns: {
            collections: {},
            views: {}
        },

        routes: {
            "":                         "list",     // #flickr
            "flickr":                   "list",     // #flickr
            "flickr/:photo_name":       "details",  // #flickr/photo.jpg
            "flickr/search/:tag":       "search"    // #flickr/search/dog
        },

        initialize: function(options) {
            this.$root = options.$el;
            this.$search = options.$search;

            this.ns.collections.items = new FlickrItemsCollection();
            
            this.ns.views.list = new FlickrItemsView({ collection: this.ns.collections.items });

            this.ns.views.search = new SearchView({ route: this });
            this.$search.html( this.ns.views.search.render().el );

            this.listenTo(this.ns.collections.items, 'reset change', this.renderList);
            this.listenTo(this.ns.collections.items, 'fetch:start', this.showLoadIndicator);
            this.listenTo(this.ns.collections.items, 'fetch:end', this.hideLoadIndicator);
        },

        renderList: function(collection, options) {
            if (!collection.size()) {
                if (!this.ns.views.noitems) {
                    this.ns.views.noitems = new NoItemFoundView({ message: 'No items found!' });
                }
                this.$root.html( this.ns.views.noitems.render().el );
            } else {
                this.$root.html( this.ns.views.list.render().el );
            }
        },

        /**
         * List route handler
         * Responsible for rendering Flickr Public Feed.
         */
        list: function() {
            this.search(CONFIGURATION.filter.tags);
        },

        /**
         * Details route handler
         * Responsible for rendering Flickr Details View
         */
        details: function(fileName) {
            var itemModel;

            if (this.ns.collections.items.size()) {
                itemModel = this.ns.collections.items.getByFileName(fileName);
                if (itemModel) {
                    this.ns.views.item = new FlickrItemView({ model: itemModel });
                    this.$root.html( this.ns.views.item.render().el );
                } else {
                    // TODO: no Item found
                    if (!this.ns.views.noitem) {
                        this.ns.views.noitem = new NoItemFoundView({ message: ['No item with fileName ', fileName,' was found!'].join('') });
                    }
                    this.$root.html( this.ns.views.noitem.render().el );
                }
            } else {
                // TODO: Fetch the item or items
                if (!this.ns.views.noitem) {
                    this.ns.views.noitem = new NoItemFoundView({ message: ['No item with fileName ', fileName,' was found!'].join('') });
                }
                this.$root.html( this.ns.views.noitem.render().el );
            }
        },

        /**
         * Search by tag name handler
         * Responsible for searching Flickr service based on provided tag
         * @param  {String} tag tag name to lookup by
         */
        search: function(tags) {
            if (this.ns.collections.items.size() && this.ns.collections.items.getFilter().tags === tags) {
                this.renderList(this.ns.collections.items);
            } else {
                this.ns.collections.items.setFilter({ tags: tags });
                this.ns.collections.items.fetch({ reset: true });
            }
            this.ns.views.search.setTerm(tags);
        },

        showLoadIndicator: function() {
            this.$root.removeClass('loading').addClass('loading');
        },

        hideLoadIndicator: function() {
            this.$root.removeClass('loading');
        }

    });

    return URLFlickrRoute;
});