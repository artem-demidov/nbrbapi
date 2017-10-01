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

describe("Rates Endpoint", function() {
    beforeEach(function(done){
        done();
    });

    afterEach(function(done){
       done();
    });

    it("successfully calls the rates endpoint", function(done) {
       done();
    });
});