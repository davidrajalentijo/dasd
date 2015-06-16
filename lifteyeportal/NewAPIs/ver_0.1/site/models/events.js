// File 'nodeserver/site/models/events.js

// Called from "nodeserver/site/routes.js" by: app.get('api/events/:id", events.getEventsbyID);

exports.getEventsbyID = function(req, res) {
    var _ = require( 'underscore' );
    var Q = require( 'q' );
    // Check authentication
    var a_promise = require('../helpers/checktokenp').isAuthorized(req.cookies.user_id, req.cookies.auth_token, req.cookies.role_id);
    a_promise.then(
        function(resolveddata) {
            if (resolveddata.msg) {
                // auth is positive, so now fetch events
                var promisearray =[];
                // now, push promise for 'track-type' events and then promise for 'cabin-type' events
                promisearray.push( require('../helpers/lib/getEventsfromID').getTrackEvents(req.params.id) );
                promisearray.push( require('../helpers/lib/getEventsfromID').getCabinEvents(req.params.id) );
                var deferred = Q.defer();
                Q.all(promisearray).then(
                    function(retdata) {
                        res.statusCode = 200;
                        res.send( _.first(_.sortBy( _.union( retdata[0], retdata[1] ) , 'eventid' ).reverse(), 100) );
                    }, function(abortdata) {
                        res.statusCode = abortdata.statusCode;
                        res.send ({
                            result: '',
                            err: 'Error when fetching events: ' + abortdata.msg
                        });
                    }
                );
            } else {
                // auth token not valid, abort and return
                res.statusCode = 401;
                res.send({
                    result: '',
                    err: 'Invalid Authentication token'
                });
            }
        }, function(rejecteddata) {
            res.statusCode = rejecteddata.statusCode;
            res.send({
                result: '',
                err: 'Error when authenticating: ' + rejecteddata.msg
            });
        }
    );
}

