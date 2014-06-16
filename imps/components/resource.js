define([
  'knockout',
  './progress',
  '../../libs/util'
],function(
  ko,
  progress,
  util
){
  return util.derive(progress,function( name ) {
    this.income = ko.observable(10);
    this.name( name );
  },{
    gain_income : function(){
      this.increase( this.income() );
    }
  });
});