define([
  '../../libs/util',
  'knockout'
],function(
  util,
  ko
){
  function progress (){
    this.max     = ko.observable(100);
    this.current = ko.observable(0);
    this.name    = ko.observable('');
    this.complete= ko.computed(function(){
      return this.current() == this.max();
    },this)
  };
  return util.derive( progress,{
    increase : function( n ) {
      n = n || 1;
      this.current( Math.min( this.current() + n, this.max() ));
    }
  });
});