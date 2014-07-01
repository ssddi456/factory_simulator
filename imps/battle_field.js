define([
  './components/castle',
  'knockout',
  './components/army',
  './components/solider',
  '../libs/timer',
  './components/battle_grids'
],function(
  castle,
  ko,
  army,
  solider,
  timer,
  battle_grids
){
  var bf_width = 20;
  var army_a = new army({ start_pos : 0,           def_attr : {            name : 'a_s' }});
  var army_b = new army({ start_pos : bf_width -1, def_attr : { dir  : -1, name : 'b_s' }});

  army_a.soliders.push(new castle({ pos : 0,           alliance : army_a }));
  army_b.soliders.push(new castle({ pos : bf_width -1, alliance : army_b }));

  army_a.current = army_b.current = 7
  
  var battle_field = new battle_grids({len:bf_width});
  
  var armys = [army_a,army_b];
  var stages = ['gain_solider','search_and_attack','move_forward','round_final'];
  

  battle_field.round = ko.observable(0);
  battle_field.timer = new timer(function() {

    battle_field.round( battle_field.round() + 1 );
    console.log( battle_field.round() );

    stages.forEach(function( stage ) {
      armys.forEach(function( army ) {
        army[stage]( battle_field, battle_field.timer );
      });
    });
      
  },1e3);

  return battle_field;
});