/**
 * NbrbException.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
'use strict'

//Utils module loaded
var util = require("util");

/**
 * Error Class NbrbException
 * */
function NbrbException(status, message, responseMessage) {

    /*INHERITANCE*/
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor);//super helper method to include stack trace in error object

    //Set the name for the ERROR
    //set our function’s name as error name.
    this.name    = this.constructor.name;

    //Define error message
    //Concat and make a string.
    this.message = [status, ": ", message, ": ", responseMessage].join("");
}

// inherit from Error
util.inherits(NbrbException, Error);

//Export the constructor function as the export of this module file.
module.exports = NbrbException;