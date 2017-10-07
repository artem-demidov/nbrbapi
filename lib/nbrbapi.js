"use strict"

var url   = require("url");
var http  = require("http");
var https = require("https");

var NbrbException  = require("./nbrbexception");
var NbrbRequest    = require("./nbrbrequest");
var NbrbParameters = require("./nbrbparameters");

/*
 * @class
 *
 * Node.js Client Binding API; representation of a Api server.
 * Call instance methods upon this object to communicate with particular
 * Api server endpoints.
 *
 * @example var api = new NbrbAPI(serviceUrl, protocolType);
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function NbrbAPI(serviceUrl, protocolType) {

    /**
     * @type {object}
     * @desc The HTTP(S) object
     */
    this.httpAdapter = http;

    /**
     * @type {object}
     * @desc The Nbrb API endpoint parameters
     */
    this.parameters  = new NbrbParameters();

    /**
     * @type {string}
     * @desc URL of the API
     * @default
     */
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

/**
 * Makes an HTTP request to the specified Nbrb API endpoint and returns the result
 * @param {string} endpoint - The Nbrb API endpoint to be used
 * @param {function} callback - Callback function to be exectuted after the function to which it is passed is complete
 */
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

/**
 * Set parameters
 * @param {object} params - The Nbrb API parameters for request
 */
NbrbAPI.prototype.setParameters = function (params) {
    this.parameters.initParams(params);
}

module.exports = NbrbAPI;