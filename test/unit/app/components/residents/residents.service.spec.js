describe('residentsService', function () {

	beforeEach(module('residents'));

	var residentsService;
	var $httpBackend;

	beforeEach(inject(function(_residentsService_, _$httpBackend_){
		residentsService = _residentsService_;
		$httpBackend = _$httpBackend_;
	}));

	it('should get a list of residents', function () {
		var list= [];

		var residents = residentsService
			.getResidents();
			/*.then(function(knownUsers){
				list = knownUsers;
			});*/

		expect(residents.length).toBe(3);
	});

});