"use strict"

var api = new NbrbApi();

api.setParameters({'curID':'298', 'startDate': '2017-6-1','endDate': '2017-7-30'});
api.request('dynamicrates', function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});