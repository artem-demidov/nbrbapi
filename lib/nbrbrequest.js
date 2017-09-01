"use strict"

var http  = require("http");
var https = require("https");
var url   = require("url");
var zlib  = require("zlib");

var NbrbException = require("./nbrbexception");


function NbrbRequest() {
    this.headers = {
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-encoding":"gzip, deflate, br",
        "accept-language":"en-US,en;q=0.5",
        "content-type":"application/json; charset=utf-8"
    }
}

NbrbRequest.prototype.makeRequest = function(requestType, httAdapter, urlParts, parameters, callback) {

    var options = {
        hostname: urlParts.hostname,
        path: urlParts.path,
        method: requestType,
        headers: this.headers,
        agent: false
    };

    if (urlParts.port) {
        options.port = urlParts.port;
    }

    var requestTask = function(callback) {
        var result = new Buffer("");

        var req = httAdapter.request(options, function(res){
            res.on("data", function(docs) {
                result = Buffer.concat([result, docs]);
            });

            res.on("end", function(err) {
                if (err) {
                    callback(err);
                }

                if (res.headers['content-encoding'] !== undefined
                    && res.headers['content-encoding'].indexOf('zlib') != -1) {
                        result = zlib.gunzipSync(result);
                }

                result = JSON.parse(result);
                result.headers = res.headers;
                result = JSON.stringify(result);

                if (res.statusCode == 200) {
                    return callback(null, JSON.parse(result.toString()));
                } else {
                    return callback(new NbrbException(res.statusCode, result.toString()));
                }

            });
        });

        req.on("error", function(err) {
            console.log(err);
            return callback(err);
        });

        req.end();
    };

    requestTask(callback);
}

module.exports = NbrbRequest;
