
//index.js is Very Special File in folder, to export something form one directory files to some other directory files.

const fru1 = require("./apple");
const fru2 = require("./banana");
const fru3 = require("./lichi");

/**
exports.fru1 = require("./apple");
exports.fru2 = require("./banana");
exports.fru3 = require("./lichi");
 */

// module.exports=[fru1,fru2,fru3];


module.exports = {
    apple:fru1,
    banana:fru2,
    lichi:fru3,
}