define([
  './grid',
  '../../libs/util',
  'knockout'
],function(
  grid,
  util,
  ko
){
  return util.derive(util.koModule({
      grids : []
    }),function( prop ) {
      for(var i = 0; i < prop.len; i ++ ){
        this.grids.push(new grid({
          grids : this,
          pos   : i
        }));
      }
    },{
      get : function( n ) {
        if( n < this.grids.length || n > 0 ){
          return this.grids()[n];
        }
      }
    });
});