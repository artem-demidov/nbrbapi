"use strict"

var url   = require("url");
var http  = require("http");
var https = require("https");

var NbrbException  = require("./nbrbexception");
var NbrbRequest    = require("./nbrbrequest");
var NbrbParameters = require("./nbrbparameters");

function NbrbAPI(serviceUrl, protocolType) {

    this.httpAdapter = http;

    this.parameters  = new NbrbParameters();

    if (serviceUrl) {
        if (serviceUrl.slice(-1) !== "/") {
            serviceUrl.concat("/");
        }
        this.serviceUrl = serviceUrl;
    } else {
        this.serviceUrl = "http://www.nbrb.by/API/ExRates/";
    }

    var urlParts = url.parse(this.serviceUrl);
    if (urlParts.protocol == "https:") {
        this.httpAdapter = https;
    }

    if (protocolType !== undefined) {
        if (protocolType == "http") {
            this.httpAdapter = http;
        } else if (protocolType == "https") {
            this.httpAdapter = https;
        }
        this.serviceUrl = this.serviceUrl.replace(/^.+?:\/\//, protocolType + "://");
    }
}

NbrbAPI.prototype.request = function(endpointName, callback) {
    var api = this;
    var EndPoint = require('./request/' + endpointName);
    var endpoint = new EndPoint();

    endpoint.getResult(api.parameters, api.httpAdapter, api.serviceUrl, function (error, result) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, result);
        }
    });
}

NbrbAPI.prototype.setParameters = function(params) {
    this.parameters.initParams(params);
}

module.exports = NbrbAPI;