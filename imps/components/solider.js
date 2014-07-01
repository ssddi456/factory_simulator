define([
  'knockout',
  '../../libs/util'
],function(
  ko,
  util
){
  return util.derive(util.koModule({
      pos                : 0,
      spd                : 1,
      atk                : 5,
      def                : 1,
      hp                 : 10,
      dir                : 1,
      att_range          : 1,
      name               : '',
      damage_stack       : [],
      last_damage_source : '',
      alliance           : ''
    }),function() {
      this.is_alive =  ko.computed(function() {
                        return this.hp() > 0;
                      },this);
      this.solider = true;
    },{
      attack : function( solider ) {
        solider.reciev_damage( this.atk() - solider.def(), this );
      },
      search : function( field ) {
        var grid, unit;
        var pos = this.pos();
        var dir = this.dir();
        var alliance = this.alliance();

        for(var i = 1, n = this.att_range(); i <= n; i ++ ){
          grid = field.get(  pos + dir * i );
          if( grid ){
            unit = grid.units()[0];
            console.log( grid.units().length, unit, unit && unit.solider );
            if( unit && unit.solider &&  unit.alliance() != alliance ){
              return unit;
            }
          } else {
            return;
          }
        }
      },
      reciev_damage : function( damage, dealer ) {
        this.damage_stack.push([damage, dealer.name() ]);
      },
      damage_final_acount : function() {
        var hp = this.hp();
        var stack = this.damage_stack();
        console.log( this.name(), JSON.stringify(stack) );
        for(var i =0, n = stack.length ;i< n; i ++){
          hp -= stack[i][0];
          if( hp <= 0 ){
            break;
          }
        }
        this.damage_stack.removeAll();
        this.hp( hp );
      },
      next_pos : function( ) {
        return this.pos() + this.spd() * this.dir();
      },
      can_move : function( grid ) {
        return grid && grid.empty();
      },
      move_to  : function( grid ) {
        console.log('move', this.name(), 'from', this.pos(), 'to', grid.pos );
        var prev_grid = grid.grids().get( this.pos() );

        prev_grid && prev_grid.units.remove(this);

        this.pos(grid.pos);
        grid.units.push(this);
      },
      die      : function( field ) {
        var grid = field.get( this.pos() );
        grid.units.remove(this);
        console.log( this.name() , ': die');
      }
    })
});