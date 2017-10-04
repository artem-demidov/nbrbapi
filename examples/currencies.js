"use strict"

var api = new NbrbApi();
api.request("currencies", function(err, res){
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});
