"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function Currencies()
{}

/**
 * Makes an HTTP request to the specified Nbrb API endpoint and returns the result
 * @param {object} parameters - The Nbrb API endpoint parameters
 * @param {object} protocol -  The object for work HTTP or HTTPS protocol
 * @param {string} serviceURL - The base service URL to be used to access the Nbrb API
 * @param {function} callback - Callback function to be exectuted after the function to which it is passed is complete
 */
Currencies.prototype.getResult = function (parameters, protocol, serviceUrl, callback) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl + 'Currencies';

    if (params.curID != null) {
        currentServiceUrl += '/' + params.curID;
    } else if (params.curName != null) {
        var currencyID = this._getCurrencyIdByName(params.curName);
        currentServiceUrl += '/' + currencyID;
    }

    var urlParts = url.parse(currentServiceUrl);
    var req      = new NbrbRequest();
    req.makeRequest("GET", protocol, urlParts, parameters, callback);
}

module.exports = Currencies;