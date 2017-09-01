
"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function Rates()
{}

Rates.prototype.getResult = function (parameters, protocol, serviceUrl, callback) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl + 'Rates';

    if (params.curID == null && params.curName == null) {
        return callback(new NbrbException("badArguments", "Doesn't have currency in parameters", "bad agruments"));
    }

    currentServiceUrl = this._makeServiceUrl(parameters, currentServiceUrl);

    var urlParts = url.parse(currentServiceUrl);
    var req      = new NbrbRequest();
    req.makeRequest("GET", protocol, urlParts, parameters, callback);
}

Rates.prototype._makeServiceUrl = function (parameters, serviceUrl) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl;

    if (params.curID != null) {
        currentServiceUrl += '/' + params.curID + '?ParamMode=1';
    } else if (params.curName != null) {
        currentServiceUrl += '/' + params.curName + '?ParamMode=2';
    }

    if (params.onDate != null) {
        currentServiceUrl += '&onDate=' + params.onDate;
    }

    return currentServiceUrl;
}

module.exports = Rates;

