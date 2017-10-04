"use strict"

var api = new NbrbApi();

api.setParameters({'curName':'USD', 'ParamMode': '2'});
api.request('rates', function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});
