var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	//var RuntimeSpy = require('./RunTimeSpy')
}
class Harness {
    constructor(harnessName){
		this.harnessName = harnessName
	}

}

if (isNode())
	module.exports = Harness