define([
  '../unit_data',
  './product',
  './progress',
  './factory',
  'jquery',
  './solider',
  '../../libs/util',
  'knockout'
],function(
  unit_data,
  product,
  progress,
  factory,
  $,
  solider,
  util,
  ko
){
  return util.koModule({
      start_pos  : -1,
      soliders   : [],
      def_attr   : {},
      count      : 0,
      storehouse : [],
      flag       : ''
    },[
      'def_attr', 'count', 'flag'
    ])
    .derive(function() {
      this.def_attr.alliance = this;
      
      this.factory = new factory({ 
                          name       : this.name + '::factory',
                          storehouse : this.storehouse,
                          unit_data  : unit_data
                        });

    },{
      gain_solider : function( field, timer ){

        this.factory.produce();

        if( this.storehouse().length ){
          var waiting_solider = this.storehouse.shift();
          this.count ++;
          var data = $.extend({},waiting_solider.data,{
                pos : this.start_pos()
              },this.def_attr);

          data.name += '::' + this.count;
          this.soliders.push(new solider(data));
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
          solider.move_forward( field );
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