
"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function Rates()
{}

Rates.prototype.getResult = function (parameters, protocol, serviceUrl, callback) {
    var params            = parameters.loadParams();
    var currentServiceUrl = serviceUrl + 'Rates';

    if (params.curID == null && params.curISO == null && params.curName == null && params.periodicity == null) {
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
        currentServiceUrl += '/' + params.curID;
    } else if (params.curISO != null) {
        currentServiceUrl += '/' + params.curISO + '?ParamMode=';
        currentServiceUrl += (params.paramMode != null) ? params.paramMode : '1';
    } else if (params.curName != null) {
        currentServiceUrl += '/' + params.curName + '?ParamMode=';
        currentServiceUrl += (params.paramMode != null) ? params.paramMode : '2';
    }

    if (params.periodicity != null) {
        currentServiceUrl = serviceUrl + '?Periodicity=' + params.periodicity;
    }

    if (params.onDate != null) {
        if (currentServiceUrl.indexOf('?') != -1) {
            currentServiceUrl += '&onDate=' + params.onDate;
        } else {
            currentServiceUrl += '?onDate=' + params.onDate;
            if (params.periodicity != null) {
                currentServiceUrl += params.periodicity;
            }
        }
    }

    return currentServiceUrl;
}

module.exports = Rates;

