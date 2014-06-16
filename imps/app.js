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
  '../libs/ko.extendbindings',
  './components/resource',
  './components/produce_mgr',
  './components/factory',
  './components/products',
  'knockout',
  'jquery'
],function(
  koextendbindings,
  resource,
  produce_mgr,
  factory,
  products,
  ko,
  $
){
  // var k;
  // for ( k in ko ){
  //   if( ko.hasOwnProperty(k)){
  //     console.log( k );
  //   }
  // }
  window.ko = ko


  var produce_mgr_test = new produce_mgr();

  produce_mgr_test.factories.push( new factory('factory 1', products ) );
  produce_mgr_test.factories.push( new factory('factory 2', products ) );
  produce_mgr_test.factories.push( new factory('factory 3', products ) );
  produce_mgr_test.factories.push( new factory('factory 4', products ) );

  produce_mgr_test.resources.push( new resource('walter') );
  produce_mgr_test.resources.push( new resource('wood') );
  produce_mgr_test.resources.push( new resource('steel') );


  setTimeout(function(){

    produce_mgr_test.gain_income();
   
    if ( !produce_mgr_test.factories().map(function(factory){
            return factory.products.complete();
          }).every(Boolean) 
          && produce_mgr_test.factories()[0].products.complete() 
    ){
      produce_mgr_test.factories.push( produce_mgr_test.factories.shift() );
    }
    produce_mgr_test.produce();

    setTimeout(arguments.callee,1e3);
  },1e3);

  ko.applyBindings ( produce_mgr_test );

});