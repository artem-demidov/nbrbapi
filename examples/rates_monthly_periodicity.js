var api = new NbrbApi();

api.setParameters({'onDate': '2017-7-6', 'periodicity': '1'});
api.request('rates', function(err, res) {
    chai.expect(err).to.be.null;
    chai.expect(res.name).to.equal("Nbrb API");
    done();
});