"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function DynamicRates()
{}

DynamicRates.prototype.getResult = function (parameters, protocol, serviceUrl, callback) {
    var params = parameters.loadParams();

    if (params.curID == null) {
        return callback(new NbrbException("badArguments", "Doesn't have currency id in parameters", "bad agruments"));
    }

    if (params.startDate == null || params.endDate == null) {
        return callback(new NbrbException("badArguments", "Doesn't have start date and end date in parameters", "bad agruments"));
    }

    var currentServiceUrl = this._makeServiceUrl(parameters, serviceUrl);

    var urlParts = url.parse(currentServiceUrl);
    var req      = new NbrbRequest();
    req.makeRequest("GET", protocol, urlParts, parameters, callback);
}

DynamicRates.prototype._makeServiceUrl = function (parameters, serviceUrl) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl + 'Dynamics';

    currentServiceUrl += '?startDate=' + params.startDate + '&endDate=' + params.endDate;

    return currentServiceUrl;
}

module.exports = DynamicRates;
