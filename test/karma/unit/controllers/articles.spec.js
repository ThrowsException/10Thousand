(function() {
    'use strict';

    // Articles Controller Spec
    describe('MEAN controllers', function() {

        describe('AchievementsController', function() {

            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var ArticlesController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                ArticlesController = $controller('AchievementsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one achievement object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('achievements?').respond([{
                        title: 'An Article about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.achievements).toEqualData([{
                        title: 'An Article about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one achievement object fetched ' +
                'from XHR using a achievementId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.achievementId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testArticleData = function() {
                        return {
                            title: 'An Article about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    //$httpBackend.expectGET(/achievements\/([0-9a-fA-F]{24})$/).respond(testArticleData());
                    $httpBackend.expectGET('achievements/525a8422f6d0f87f0e407a33?').respond(testArticleData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.achievement).toEqualData(testArticleData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postArticleData = function() {
                        return {
                            name: 'An Article about MEAN'
                        };
                    };

                    // fixture expected response data
                    var responseArticleData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            name: 'An Article about MEAN'
                        };
                    };

                    // fixture mock form input values
                    scope.name = 'An Article about MEAN';

                    // test post request is sent
                    $httpBackend.expectPOST('achievements?', postArticleData()).respond(responseArticleData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.name).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/achievements/' + responseArticleData()._id);
                });
        });

    });
}());