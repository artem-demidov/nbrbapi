var NbrbAPI = require('./lib/nbrbapi');

var api = new NbrbAPI(null, "http");

api.setParameters({'curID':'298', 'onDate':'07-05-2017'});
api.request('rates', function (error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});