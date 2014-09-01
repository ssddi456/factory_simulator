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
  '../libs/ko.extendbindings'
],function(
  battle_field,
  ko,
  koextendbindings
){

  ko.applyBindings(battle_field,$('[ko-control=battle_field]').get(0));

  battle_field.timer.run();

});