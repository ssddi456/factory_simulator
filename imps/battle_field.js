define([
  'knockout',
  './components/army',
  './components/solider',
  '../libs/timer',
  './components/battle_grids'
],function(
  ko,
  army,
  solider,
  timer,
  battle_grids
){
  var army_a = new army({ start_pos : -1, def_attr : { name : 'a_solider' }});
  var army_b = new army({ start_pos : 12, def_attr : { spd  : -1, name : 'b_solider' }});
  
  army_a.current = army_b.current = 7
  
  var battle_field = new battle_grids({len:12});
  
  var armys = [army_a,army_b];
  var stages = ['gain_solider','move_forward','round_final'];
  

  battle_field.round = ko.observable(0);
  battle_field.timer = new timer(function() {

    battle_field.round( battle_field.round() + 1 );
    console.log( battle_field.round() );

    stages.forEach(function( stage ) {
      armys.forEach(function( army ) {
        army[stage]( battle_field );
      });
    });
      
  },1e3);

  return battle_field;
});