# nbrbapi

This is the Nbrb API client binding for node.js.

## Example using the Nbrb API language detection endpoint
```javascript
var api = new NbrbApi();

api.setParameters({'curID':'298'});
api.request("currencies", function(err, res){
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});
```
## Additional Examples
See [examples](examples).

## API Documentation
See [documentation](http://www.nbrb.by/APIHelp/ExRates)