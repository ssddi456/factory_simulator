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
      this.def_attr.alliance = this;
      this.soliders = ko.observableArray();
    },{
      gain_solider : function( field, timer ){
        this.current ++;
        if( this.current > this.gain_rate ){
          this.count ++;
          this.current = 0;
          var data = $.extend({
                pos : this.start_pos()
              },this.def_attr);
          data.att_range = Math.random() > 0.5 ? 3 : 1;
          data.name +=  (data.att_range == 3 ? 'ranger' : 'footman') + '::' + this.count;
          this.soliders.push(new solider(data))
        }
      },
      search_and_attack : function( field, timer ){
        var self = this;
        this.soliders().forEach(function( solider ){
  
          // attack first
          var target = solider.search( field );
          if( target ){
            solider.attack( target );
            solider.acted = true;
          }
        })
      },
      move_forward : function( field, timer ) {
        var self = this;
        this.soliders().forEach(function( solider ){
          if( solider.acted ){
            return;
          }
          var next_pos = field.get( solider.next_pos() );
          // move the second
          if( solider.can_move(next_pos) ){
            solider.move_to(next_pos);
          }
        })
      },
      round_final : function( field, timer ){
        var self = this;
        this.soliders().forEach(function( solider ) {
          solider.damage_final_acount();
          if( !solider.is_alive() ){
            solider.die(field, timer);
            self.soliders.remove( solider );
          }
          solider.acted = false;
        });
      }
    });
});