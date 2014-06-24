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
      curent   : 0,
      count    : 0,
      def_attr : {}
    },[
      'gain_rate','curent','def_attr','count'
    ]),function() {
      this.soliders = ko.observableArray();
    },{
      move_forward : function( field ) {
        var self = this;
        this.soliders().forEach(function( solider ){
          if( !solider.is_alive() ){
            field.get( solider.pos() ).unit(null);
            self.soliders.remove(solider);
            return;
          }
  
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
      gain_solider : function( ){
        this.curent ++;
        if( this.curent > this.gain_rate ){
          this.count ++;
          this.curent = 0;
          var data = $.extend({
                pos : this.start_pos()
              },this.def_attr);
  
          data.name += ' ' + this.count;
          this.soliders.push(new solider(data))
        }
      }
    });
});