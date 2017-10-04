"use strict"

var api = new NbrbApi();

api.setParameters({'curID':'145'});
api.request('rates', function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});