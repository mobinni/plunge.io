/**
 * Created by mobinni on 28/04/15.
 */
var Plunge = require('plunge'),
    router = Plunge.router;

router.get('/user', function(req, res) {
    res.send('brent');
});