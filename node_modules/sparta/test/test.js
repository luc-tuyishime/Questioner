var sparta = require('../sparta');
var should = require('should');

describe('Spatial bounding box calculation', function(){
  describe('#bbox()', function(){
    it('should return bounding box for Barcelona', function(){
      sparta.boundingBox(41.386549,2.170004,1).should.be.an.instanceOf(Array);
    })
  })
})
