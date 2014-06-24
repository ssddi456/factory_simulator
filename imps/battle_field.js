define([
  './components/army',
  './components/solider',
  '../libs/timer',
  './components/battle_grids'
],function(
  army,
  solider,
  timer,
  battle_grids
){
  var army_a = new army({ start_pos : -1, def_attr : { name : 'a_solider' }});
  var army_b = new army({ start_pos : 12, def_attr : { spd  : -1, name : 'b_solider' }});

  var battle_field = new battle_grids({len:12});

  battle_field.timer = new timer(function() {
    army_a.gain_solider();
    army_b.gain_solider();

    army_a.move_forward( battle_field );
    army_b.move_forward( battle_field );
  },1e3);

  return battle_field;
});