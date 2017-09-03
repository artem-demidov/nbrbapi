var NbrbAPI = require('./lib/nbrbapi');

var api = new NbrbAPI(null, "http");

api.setParameters({'curID':'298', 'startDate': '2017-6-1','endDate': '2017-7-30'});
//api.setParameters({'periodicity':0});
//api.setParameters({'curName': 'USD'});
api.request('dynamicrates', function (error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});