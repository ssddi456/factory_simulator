require.config({
  baseUrl: './imps',
  paths : {
    'jquery' : 'http://cdn.staticfile.org/jquery/1.11.0/jquery',
    'knockout':'http://cdn.staticfile.org/knockout/3.1.0/knockout-debug',
    '_'       :'http://cdn.staticfile.org/underscore.js/1.6.0/underscore',
  },
  map : {
    '*' : {
      'ko' : 'knockout'
    }
  }
});

require([
  './battle_field',
  'knockout',
  '../libs/ko.extendbindings',
  './factories'
],function(
  battle_field,
  ko,
  koextendbindings,
  factory
){

  ko.applyBindings(factory,$('[ko-control=factory]').get(0));
  ko.applyBindings(battle_field,$('[ko-control=battle_field]').get(0));

  factory.timer.run();
  battle_field.timer.run();

});