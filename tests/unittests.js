"use strict"

var chai = require("chai");
var mock = require("mock");
var nock = require("nock");

var fs   = require("fs");

var NbrbApi = require("../lib/nbrbapi");

describe("Currencies Endpoint (List Of All Currencies)", function() {
    before(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Currencies")
            .get('')
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    after(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the currencies endpoint", function(done){
        var api = new NbrbApi();
        api.request("currencies", function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

});

describe("Currencies Endpoint (Once Currencies)", function() {
    before(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Currencies")
            .get('/298')
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    after(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully call the once currency endpoint", function(done){
        var api = new NbrbApi();

        api.setParameters({'curID':'298'});
        api.request("currencies", function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curID parameter", function(done) {
        var api = new NbrbApi();

        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Dynamicrates Endpoint", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates/Dynamics")
            .get('/298?startDate=2017-6-1&endDate=2017-7-30')
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the dynamicrates endpoint", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID':'298', 'startDate': '2017-6-1','endDate': '2017-7-30'});
        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curID parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'startDate': '2017-6-1','endDate': '2017-7-30'});
        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing startDate parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID':'298','endDate': '2017-7-30'});
        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing endDate parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID':'298', 'startDate': '2017-6-1'});
        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing startDate and endDate parameters", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID':'298'});
        api.request('dynamicrates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Rates Endpoint By Internal Code", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("/145")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the rates endpoint", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID':'145'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curID parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Rates Endpoint By Digital Code", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("/840?ParamMode=1")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the rates endpoint", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curISO':'840', 'ParamMode': '1'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curISO parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'ParamMode': '1'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Rates Endpoint By Text Code", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("/USD?ParamMode=2")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the rates endpoint", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curName':'USD', 'ParamMode': '2'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curName parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Rates Endpoint By Text Code", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("/USD?ParamMode=2")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully calls the rates endpoint", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curName':'USD', 'ParamMode': '2'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curName parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("List Of Daily Rates", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("?Periodicity=0")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully call the list of daily rates", function(done) {
        var api = new NbrbApi();

        api.setParameters({'periodicity': '0'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing periodicity parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Currency Rate On Some Day", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("/298?onDate=2017-7-6")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully call the currency date on some day", function(done) {
        var api = new NbrbApi();

        api.setParameters({'curID': '298','onDate':'2017-7-6'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing curID parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'onDate':'2017-7-6'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing curID and onDate parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});



describe("List Of Daily Rates For Some Day", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("?onDate=2017-7-6&Periodicity=0")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully call the list of daily rates on some day", function(done) {
        var api = new NbrbApi();

        api.setParameters({'onDate': '2017-7-6', 'periodicity': '0'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing periodicity parameter", function(done) {
        var api = new NbrbApi();

        api.setParameters({'onDate': '2017-7-6'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing onDate and periodicity parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("List Of Monthly Rates For Some Day", function() {
    beforeEach(function(done){
        var mockResponse = JSON.stringify({'name': 'Nbrb API', 'versionChecked': true});

        nock("http://www.nbrb.by/API/ExRates/Rates")
            .get("?onDate=2017-7-6&Periodicity=1")
            .reply(200, JSON.parse(mockResponse));

        done();
    });

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    it("successfully call the list of monthly rates on some day", function(done) {
        var api = new NbrbApi();

        api.setParameters({'onDate': '2017-7-6', 'periodicity': '1'});
        api.request('rates', function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal("Nbrb API");
            done();
        });
    });

    it("detects missing periodicity parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing onDate and periodicity parameter", function(done) {
        var api = new NbrbApi();

        api.request('rates', function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal("NbrbException");
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

