define([
  './components/product',
  './unit_data',
  './components/factory',
  './components/castle',
  'knockout',
  './components/army',
  './components/solider',
  '../libs/timer',
  './components/battle_grids'
],function(
  product,
  unit_data,
  factory,
  castle,
  ko,
  army,
  solider,
  timer,
  battle_grids
){
  var bf_width = 20;


  var army_a = new army({ start_pos : 0,           flag : 'red',  def_attr : {            name : 'a_s' }} );
  var army_b = new army({ start_pos : bf_width -1, flag : 'blue', def_attr : { dir  : -1, name : 'b_s' }} );


  var battle_field = new battle_grids({len:bf_width});
  
  army_a.soliders.push(new castle({ alliance : army_a }));
  army_a.soliders()[0].move_to( battle_field.get(0) );
  
  army_b.soliders.push(new castle({ alliance : army_b }));
  army_b.soliders()[0].move_to( battle_field.get(bf_width -1) );

  var armys = [army_a,army_b];
  var stages = ['gain_solider','search_and_attack','move_forward','round_final'];
  
  ko.applyBindings(army_a.factory,$('[ko-control=factory_a]').get(0));
  // ko.applyBindings(army_b.factory,$('[ko-control=factory_b]').get(0));

  battle_field.round = ko.observable(0);
  battle_field.timer = new timer(function() {

    battle_field.round( battle_field.round() + 1 );
    console.log( 'round ',battle_field.round() );

    stages.forEach(function( stage ) {
      armys.forEach(function( army, i ) {
        i && (battle_field.round() + 1 ) % 3 && army.factory.add_product( new product( unit_data.crusaders ));
        army[stage]( battle_field, battle_field.timer );
      });
    });
      
  },1e3);

  return battle_field;
});