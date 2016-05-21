var xyzObjectLocation = require('../src/xyzObjectLocation.js');

describe("A suite s", function() {

    var object = new xyzObjectLocation();


    it("object has default value", function() {
        console.log(object.getVal());
        expect(object.getVal() ==  0 ).toBe(true);
    });



    it("object has value", function() {
        object.setVal(2);
        expect(object.getVal() ==  2 ).toBe(true);
    });



});


