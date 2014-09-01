define([
  './progress',
  '../../libs/util'
],function(
  progress,
  util
){
  return util.derive(progress,function( opts ) {
    this.data = (opts ? opts.data : false) || {};
  });
});