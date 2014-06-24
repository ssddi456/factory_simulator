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

      last_damage_source : ''
    }),function() {
      this.is_alive =  ko.computed(function() {
                        return this.hp() > 0;
                      },this);
      this.solider = true;
      console.time('move ' + this.name());
    },{
      attack : function( solider ) {
        solider.reciev_damage( this.atk() - solider.def() );
        solider.last_damage_source( this.name );
      },
      reciev_damage : function( damage ) {
        this.hp( this.hp() - (damage || 0));
      },
      next_pos : function( ) {
        return this.pos() + this.spd();
      },
      can_move : function( grid ) {
        return grid && grid.empty();
      },
      move_to  : function( grid ) {
        console.timeEnd( 'move '+ this.name() );
        var prev_grid = grid.grids().get( this.pos() );
        prev_grid && prev_grid.unit(null);

        this.pos(grid.pos);
        grid.unit(this);
        console.time( 'move '+ this.name() );
      },
      die      : function() {
        console.log( this.name , ': die');
      }
    })
});