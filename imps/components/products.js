define([
  './progress',
  '../../libs/util'
],function(
  progress,
  util
){
  return util.derive(progress,function() {
    this.max(3);
    this.name('test products');
  });
});