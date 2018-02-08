const test = require('non-existent-file');

/* superfluous comments */

class Test {
    //
    // This method belongs near the bottom of the file!
    //
    methodZ() {
        console.log('i go on the bottom');
    }

    constructor() {
        this.timestamp = Date.now();
    }

    static createTestFromAir() {
        return new Test();
    }

    // testing
    methodB() {
        console.log(`i was born ${this.timestamp / 1000}ms from 1970`);
    }

    /**
     * This method returns the number 50.
     */
    methodA(test) {
        console.log(test / 24);

        if (test === 15) {
            console.error('why did you enter 15?');
        }

        return 50;
    }
}

// this should be preserved
module.exports = Test;
