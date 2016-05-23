var React = require('react');
var ReactDOM = require('react-dom');

var routes = require('../src/config/routes.jsx');


describe("App suite: ", function() {

    beforeEach(function() {
        setUpHTMLFixture();
        ReactDOM.render(routes, document.getElementById('app'));
    });

    it("should be able to set fixtures", function() {
        expect(setFixtures).toBeDefined(); // Notice I took out the ()
    });

    it("App code", function() {
        expect(true ).toBe(true);
    });

    
    function setUpHTMLFixture() {
        setFixtures(''
            +'<div id="app"></div>');

    }


});


