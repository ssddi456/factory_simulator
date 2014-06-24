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
      name: ''
    }),function() {
      this.isAlive =  ko.computed(function() {
                        return this.hp() > 0;
                      },this);
      this.solider = true;
    },{
      attack : function( solider ) {
        solider.hp( this.atk() - solider.def() );
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
        grid.grids().get( this.pos() ).util(null);
        this.pos(grid.pos);
        grid.unit(this);
      }
    })
});