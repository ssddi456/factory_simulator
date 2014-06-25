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
  return util.derive(util.koModule({
      start_pos: -1,
      gain_rate: 10,
      current  : 0,
      count    : 0,
      def_attr : {}
    },[
      'gain_rate','current','def_attr','count'
    ]),function() {
      this.soliders = ko.observableArray();
    },{
      gain_solider : function( ){
        this.current ++;
        if( this.current > this.gain_rate ){
          this.count ++;
          this.current = 0;
          var data = $.extend({
                pos : this.start_pos()
              },this.def_attr);
  
          data.name += ' ' + this.count;
          this.soliders.push(new solider(data))
        }
      },
      move_forward : function( field ) {
        var self = this;
        this.soliders().forEach(function( solider ){
  
          var next_pos = field.get( solider.next_pos() );
          if( solider.can_move(next_pos) ){
            solider.move_to(next_pos);
          } else if( next_pos ){
            var unit = next_pos.unit();
            if( unit && unit.solider ){
              solider.attack( unit );
            }
          }
        })
      },
      round_final : function( field ){
        var self = this;
        this.soliders().forEach(function( solider ) {
          solider.damage_final_acount();
          if( !solider.is_alive() ){
            solider.die(field);
            self.soliders.remove( solider );
          }
        });
      }
    });
});