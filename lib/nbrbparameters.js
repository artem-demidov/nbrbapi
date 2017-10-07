/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
"use strict"

var NbrbExcpetion = require("./nbrbexception");
var http          = require("http");
var https         = require("https");

/**
 * @class NbrbParameters
 */
function NbrbParameters() {

    //Some date
    this.onDate      = null;

    //Periodicity changes of currency; 0 - daily, 1 - monthly
    this.periodicity = null;

    //Internal cyrency ID
    this.curID       = null;
    //ISO currency code
    this.curISO      = null;
    //Currency text code
    this.curName     = null;
    //Type of currency;(internal code, iso code, text name)
    this.paramMode   = null;

    //Start date
    this.startDate   = null;
    //End date
    this.endDate     = null;
}


/**
 * Loads all non-null parameters into a new JSON that will be used as parameters for a Nbrb API endpoint
 */
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

/**
 * Init new parameters for a Nbrb API endpoint
 */
NbrbParameters.prototype.initParams = function (params) {
    this.clearParams();
    this._assignParams(params);
}

/**
 * Adds new parameters for a Nbrb API endpoint
 */
NbrbParameters.prototype.addParams = function (params) {
    this._assignParams(params);
}

/**
 * Clears parameters
 */
NbrbParameters.prototype.clearParams = function() {
    var paramObj = this;
    for (var key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            paramObj[key] = null;
        }
    }
}

/**
 * Assigns parameters
 */
NbrbParameters.prototype._assignParams = function(params) {
    var paramObj = this;
    for (var key in params) {
        if (paramObj.hasOwnProperty(key)) {
            paramObj[key] = params[key];
        }
    }
}

module.exports = NbrbParameters;