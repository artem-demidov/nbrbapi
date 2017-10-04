"use strict"

var api = new NbrbApi();

api.setParameters({'periodicity': '0'});
api.request('rates', function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});