"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function DynamicRates()
{}

/**
 * Makes an HTTP request to the specified Nbrb API endpoint and returns the result
 * @param {object} parameters - The Nbrb API endpoint parameters
 * @param {object} protocol -  The object for work HTTP or HTTPS protocol
 * @param {string} serviceURL - The base service URL to be used to access the Nbrb API
 * @param {function} callback - Callback function to be exectuted after the function to which it is passed is complete
 */
DynamicRates.prototype.getResult = function (parameters, protocol, serviceUrl, callback) {
    var params = parameters.loadParams();

    if (params.curID == null) {
        return callback(new NbrbException("badArguments", "Doesn't have currency id in parameters", "bad agruments"));
    }

    if (params.startDate == null || params.endDate == null) {
        return callback(new NbrbException("badArguments", "Doesn't have start date or end date in parameters", "bad agruments"));
    }

    var currentServiceUrl = this._makeServiceUrl(parameters, serviceUrl);

    var urlParts = url.parse(currentServiceUrl);
    var req      = new NbrbRequest();
    req.makeRequest("GET", protocol, urlParts, parameters, callback);
}

/**
 * Makes an URL with parameters
 * @param {object} parameters - The parameters for request
 * @param {string} serviceURL - The base service URL withour parameters
 */
DynamicRates.prototype._makeServiceUrl = function (parameters, serviceUrl) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl + 'Rates/Dynamics';

    currentServiceUrl += '/' + params.curID;

    if (params.startDate != null && params.endDate != null) {
        currentServiceUrl += '?startDate=' + params.startDate + '&endDate=' + params.endDate;
    }

    return currentServiceUrl;
}

module.exports = DynamicRates;
