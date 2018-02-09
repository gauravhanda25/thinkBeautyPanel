'use strict';
const app = require('../server.js');
module.exports = function(Brand) {
  const {Oem} = app.models;
  Brand.getOem = function(cb) {
    Brand.find({include:"centers"}, function(err, brands) {
	  	//console.log(brands);
	  	cb(null, brands);
	});
    
  };
  Brand.remoteMethod(
    'getOem', {
      http: {
        path: '/getOem',
        verb: 'get'
      },
      returns: {
        arg: 'brands',
        type: 'json'
      }
    }
  );
};
