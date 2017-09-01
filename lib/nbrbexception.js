'use strict'

var util = require("util");

function NbrbException(status, message, responseMessage) {

    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name    = this.constructor.name;
    this.message = [status, ": ", message, ": ", responseMessage].join("");
}

util.inherits(NbrbException, Error);

module.exports = NbrbException;