define([
  'flickr/collections/Items',
  'flickr/models/Item',
  'flickr/config',
  'jasminejQuery'
], function(
  FlickrItemsCollection,
  FlickrItemsModel,
  CONFIGURATION,
  jasmine
) {


    // Fixtures paths settings
    var FIXTURES_PATH = 'base/public/js/test/fixtures/';
    jasmine.getFixtures().fixturesPath = FIXTURES_PATH;
    jasmine.getJSONFixtures().fixturesPath = FIXTURES_PATH;


    describe('flickr/collections/Items test suite', function() {

        beforeEach(function() {
          this.flickrItemsCollection = new FlickrItemsCollection();
          this.RESPONSE = loadJSONFixtures('flickerResponse.json')['flickerResponse.json'];
        });

        it("expects <Items.model> to be set", function() {
          expect(this.flickrItemsCollection.model).toEqual(FlickrItemsModel);
        });

        it("expects Items.url() to be defined", function() {
            expect(this.flickrItemsCollection).toBeDefined();          
        });

        it("expects <url()> method to return <rootApiService> by default", function() {
          expect(this.flickrItemsCollection.url()).toEqual(this.flickrItemsCollection.rootApiService);
        });

        it("expects <url()> method to correctly set filtering query parameters when provided", function() {
          var OPTS = { filter: CONFIGURATION.filter },
              EXPECTED_URL = [this.flickrItemsCollection.rootApiService, 'tagmode=all', 'tags='+OPTS.filter.tags].join('&');
          this.flickrItemsCollection = new FlickrItemsCollection(null, OPTS);
          expect(this.flickrItemsCollection.url()).toEqual(EXPECTED_URL);
        });

        it("expects <fetch()> to ping Flicker API service with correct ajax call arguments", function() {
          var ajaxSpy = spyOn($, 'ajax').andCallFake(function() {}),
              OPTS = { filter: CONFIGURATION.filter },
              EXPECTED_AJAX_OPTS = {
              dataType : 'jsonp',
              url: null 
            };

          this.flickrItemsCollection = new FlickrItemsCollection(null, OPTS);
          EXPECTED_AJAX_OPTS.url = this.flickrItemsCollection.url();
          this.flickrItemsCollection.fetch();

          expect(ajaxSpy).wasCalled();
          expect(ajaxSpy.mostRecentCall.args[0].dataType.toLowerCase()).toEqual(EXPECTED_AJAX_OPTS.dataType);
          expect(ajaxSpy.mostRecentCall.args[0].url).toEqual(EXPECTED_AJAX_OPTS.url);
        });

        it("expects <parse()> to return appriprately parsed resonse", function() {
          this.flickrItemsCollection = new FlickrItemsCollection();
          var parseSpy = spyOn(this.flickrItemsCollection, 'parse').andCallThrough();
          var PARSED_DATA = this.flickrItemsCollection.parse(this.RESPONSE);

          expect(parseSpy).wasCalledWith(this.RESPONSE);
          expect(PARSED_DATA.length).toEqual(this.RESPONSE.items.length);
          expect(PARSED_DATA).toEqual(this.RESPONSE.items);
        });

    });

});