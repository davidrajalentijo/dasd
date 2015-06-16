// File 'nodeserver/site/helpers/lib/getEventsfromID.js'

// Called from "nodeserver/site/models/events.js" by "getEventsbyID" function

exports.getTrackEvents = function(eventid) {
    var Q = require( 'q' );
    var deferred = Q.defer();
    var mpool = require('../db').pool;

    mpool.getConnection(function(err, connection) {
        if (err) {
            console.error('MySQL Connection error in getEventsfromID.js: ', err);
            deferred.reject( { statusCode: 503, msg: err.code } );
        } else {
            connection.query('SELECT * FROM events WHERE parentid=' + eventid + ' AND parenttype="track" ORDER BY events.eventtime DESC LIMIT 100', function(erq, rows, fields) {
                if (erq) {
                    console.error('MySQL Query error in getEventsfromID.js: ', erq.code);
                    deferred.reject( { statusCode: 503, msg: erq.code } );
                } else {
                    deferred.resolve( rows );
                }
            });
        }
        if ( connection ) {
            connection.release();
        }
    });

    return deferred.promise;
}


exports.getCabinEvents = function(eventid) {
    var Q = require( 'q' );
    var deferred = Q.defer();
    var mpool = require('../db').pool;

    mpool.getConnection(function(err, connection) {
        if (err) {
            console.error('MySQL Connection error in getEventsfromID.js: ', err);
            deferred.reject( { statusCode: 503, msg: err.code } );
        } else {
            connection.query('SELECT events.eventid, events.parentid, events.parenttype, events.eventtype, events.eventtime, events.eventpayload, events.eventimei, events.eventicc FROM events INNER JOIN cabins ON events.parentid = cabins.cabinid AND cabins.parentliftsiteid = ' + eventid + ' INNER JOIN liftsites ON cabins.parentliftsiteid = liftsites.liftsiteid WHERE events.parenttype = "cabin" ORDER BY events.eventtime DESC LIMIT 100', function(erq, rows, fields) {
                if (erq) {
                    console.error('MySQL Query error in getEventsfromID.js: ', erq.code);
                    deferred.reject( { statusCode: 503, msg: erq.code } );
                } else {
                    deferred.resolve( rows );
                }
            });
        }
        if ( connection ) {
            connection.release();
        }
    });

    return deferred.promise;
}
