require.config({
  baseUrl: './',
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
  'knockout',
  'jquery'
],function(
  ko,
  $
){
    
});