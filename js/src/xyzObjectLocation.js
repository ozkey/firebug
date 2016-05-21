module.exports = xyzObjectLocation;

function xyzObjectLocation (THREE) {
    
    this.x = 0;
    this.setVal = function (xVal) {
        this.x = xVal;
    };
    
    this.getVal = function () {
        return this.x;
    };

}



