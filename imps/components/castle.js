define([
  '../../libs/util',
  './solider'
],function(
  util,
  solider
){
  return util.derive(solider,function() {
    this.castle = true;
    this.name('castle');
    this.hp(1000);
    this.spd(0);
  },{
    die : function( field, timer ) {
      timer.pause();
      console.log( this.name(), 'lose' );
    }
  })
});