module.exports = require("./lib/nbrbapi");

module.exports.rates        = require("./lib/request/rates");
module.exports.dynamicrates = require("./lib/request/dynamicrates");
module.exports.currencies   = require("./lib/request/currencies");