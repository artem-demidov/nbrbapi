/**
 * Created by artem on 30.8.17.
 */
"use strict"

var NbrbExcpetion = require("./nbrbexception");
var http          = require("http");
var https         = require("https");

function NbrbParameters() {

    this.onDate      = null;
    this.periodicity = null;

    this.curID       = null;
    this.curName     = null;
    this.paramMode   = null;

    this.startDate   = null;
    this.endDate     = null;
}

NbrbParameters.prototype.loadParams = function () {
    var loadedParams = {};
    var paramsJSON   = {
        'onDate'     : this.onDate,
        'periodicity': this.periodicity,
        'curID'      : this.curID,
        'curISO'     : this.curISO,
        'curName'    : this.curName,
        'paramMode'  : this.paramMode,
        'startDate'  : this.startDate,
        'endDate'    : this.endDate
    };

    var paramObj = this;
    for (var key in paramsJSON) {
        if (paramObj.hasOwnProperty(key) && paramObj[key] !== null) {
            loadedParams[key] = paramsJSON[key];
        }
    }

    return loadedParams;
}

NbrbParameters.prototype.initParams = function (params) {
    this.clearParams();
    this._assignParams(params);
}

NbrbParameters.prototype.addParams = function (params) {
    this._assignParams(params);
}

NbrbParameters.prototype.clearParams = function() {
    var paramObj = this;
    for (var key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            paramObj[key] = null;
        }
    }
}

NbrbParameters.prototype._assignParams = function(params) {
    var paramObj = this;
    Object.keys(params).map(function (value, key) {
        if (paramObj.hasOwnProperty(key)) {
            paramObj[key] = value;
        }
    });
}

module.exports = NbrbParameters;