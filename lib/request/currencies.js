"use strict"

var url = require("url");

var NbrbRequest   = require("../nbrbrequest");
var NbrbException = require("../nbrbexception");

function Currencies()
{}

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