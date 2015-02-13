define([
  'flickr/views/Items',
  'flickr/views/Item',
  'flickr/collections/Items',
  'flickr/config',
  'jasminejQuery'
], function(
  FlickrItemsView,
  FlickrItemView,
  FlickrItemsCollection,
  CONFIGURATION,
  jasmine
) {

    // Fixtures paths settings
    var FIXTURES_PATH = 'base/public/js/test/fixtures/';
    jasmine.getFixtures().fixturesPath = FIXTURES_PATH;
    jasmine.getJSONFixtures().fixturesPath = FIXTURES_PATH;


    describe('flickr/views/Items test suite', function() {

        beforeEach(function() {
          this.RESPONSE = loadJSONFixtures('flickerResponse.json')['flickerResponse.json'];
          this.flickrItemsCollection = new FlickrItemsCollection(this.RESPONSE.items);
        });


        describe("No options test suite", function() {
          
          beforeEach(function() {
            this.flickrItemsView = new FlickrItemsView();
          });

          it("expects default options to be set", function() {
            expect(this.flickrItemsView.views).toBeDefined();
            expect(this.flickrItemsView.views.items).toBeDefined();
            expect(this.flickrItemsView.render).toBeDefined();
          });

          it("expects <render()> to return empty string", function() {
            var fiv = this.flickrItemsView.render();
            expect(fiv).toEqual(this.flickrItemsView);
            expect(fiv.$el.html()).toEqual('');
          });

        });


        describe("Options provided test suite", function() {
          
          beforeEach(function() {
            this.flickrItemsView = new FlickrItemsView({
              collection: this.flickrItemsCollection
            });
          });

          it("expects correct collection to be set", function() {
            expect(this.flickrItemsView.options.collection).toEqual(this.flickrItemsCollection);
            expect(this.flickrItemsView.options.collection.length).toEqual(this.flickrItemsCollection.length);
          });

          it("expects <views.items> to have 0 items initially", function() {
            expect(this.flickrItemsView.views.items).toEqual({});
          });

          it("expects <render()> method to set correct number of <views.items> views", function() {
            this.flickrItemsView.render();

            expect(this.flickrItemsView.views.items).toBeDefined();
            expect(Object.keys(this.flickrItemsView.views.items).length).toEqual(this.RESPONSE.items.length);
            // assert its composed out of Views
            for(var key in this.flickrItemsView.views.items) {
              expect(this.flickrItemsView.views.items[key].cid).toBeDefined();
              expect(this.flickrItemsView.views.items[key].model).toBeDefined();
            }
          });

        });

    });

});