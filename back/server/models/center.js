'use strict';
const app = require('../server.js');
module.exports = function(Center) {
  Center.getBrands = function(cb) {
    Center.find({include:"brands"}, function(err, centers) {
	  	//console.log(brands);
	  	cb(null, centers);
	});
    
  };
  Center.remoteMethod(
    'getBrands', {
      http: {
        path: '/getBrands',
        verb: 'get'
      },
      returns: {
        arg: 'centers',
        type: 'json'
      }
    }
  );
};
