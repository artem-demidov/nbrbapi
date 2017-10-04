"use strict"

var api = new NbrbApi();

api.setParameters({'curISO':'840', 'ParamMode': '1'});
api.request('rates', function(err, res) {
   if (err) {
       console.log(err);
   } else {
       console.log(res);
   }
});