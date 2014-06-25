define([
  'knockout',
  '../../libs/util'
],function(
  ko,
  util
){
  return util.derive(util.koModule({
      pos : 0,
      spd : 1,
      atk : 5,
      def : 1,
      hp  : 10,
      name: '',
      damage_stack : [],
      last_damage_source : ''
    }),function() {
      this.is_alive =  ko.computed(function() {
                        return this.hp() > 0;
                      },this);
      this.solider = true;
    },{
      attack : function( solider ) {
        solider.reciev_damage( this.atk() - solider.def(), this );
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
        return this.pos() + this.spd();
      },
      can_move : function( grid ) {
        return grid && grid.empty();
      },
      move_to  : function( grid ) {
        console.log('move', this.name(), 'from', this.pos(), 'to', grid.pos );
        var prev_grid = grid.grids().get( this.pos() );
        prev_grid && prev_grid.unit(null);

        this.pos(grid.pos);
        grid.unit(this);
      },
      die      : function( field ) {
        var grid = field.get( this.pos() );
        grid.unit(null);
        console.log( this.name() , ': die');
      }
    })
});