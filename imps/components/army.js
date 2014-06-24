define([
  'jquery',
  './solider',
  '../../libs/util',
  'knockout'
],function(
  $,
  solider,
  util,
  ko
){
  return util.koModule({
    soliders : [],
    start_pos: -1,
    gain_rate: 4,
    curent   : 0,
    def_attr : {}
  },[
    'gain_rate','curent','def_attr'
  ],{
    move_forward : function( field ) {
      this.soliders().forEach(function( solider ){
        var next_pos = field.get( solider.next_pos() );
        if( solider.can_move(next_pos) ){
          solider.move_to(next_pos);
        } else if( !next_pos ){
          var unit = next_pos.unit();
          if( unit.solider ){
            solider.attack( unit );
          }
        }
      })
    },
    gain_solider : function( ){
      this.curent ++;
      if( this.curent > this.gain_rate ){
        this.soliders.push(  
          new solider(
            $.extend({
              pos : this.start_pos()
            },this.def_attr)))
      }
    }
  });
});