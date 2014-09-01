define([
  '../../libs/util',
  'knockout'
],function(
  util,
  ko
){
  return util.koModule({
    max : 100,
    current : 0,
    name : ''
  },null,{
    increase : function( n ) {
      n = n || 1;
      this.current( Math.min( this.current() + n, this.max() ));
    }
  }).derive(function() {
    this.complete= ko.computed(function(){
      return this.current() == this.max();
    },this)  
  });
});