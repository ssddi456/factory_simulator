define([
  '../libs/timer',
  './components/resource',
  './components/produce_mgr',
  './components/factory',
  './components/products',
  'knockout',
  'jquery'
],function(
  timer,
  resource,
  produce_mgr,
  factory,
  products,
  ko,
  $
){
try{
  var produce_mgr_test = new produce_mgr();

  produce_mgr_test.factories.push( new factory('factory 1', products ) );
  produce_mgr_test.factories.push( new factory('factory 2', products ) );
  produce_mgr_test.factories.push( new factory('factory 3', products ) );
  produce_mgr_test.factories.push( new factory('factory 4', products ) );

  produce_mgr_test.resources.push( new resource('walter') );
  produce_mgr_test.resources.push( new resource('wood') );
  produce_mgr_test.resources.push( new resource('steel') );

  timer = new timer(function(){

    produce_mgr_test.gain_income();
   
    if ( !produce_mgr_test.factories().map(function(factory){
            return factory.products.complete();
          }).every(Boolean) 
          && produce_mgr_test.factories()[0].products.complete() 
    ){
      produce_mgr_test.factories.push( produce_mgr_test.factories.shift() );
    }
    produce_mgr_test.produce();

  },1e3);

  produce_mgr_test.timer = timer;
  console.log( produce_mgr_test );
  return produce_mgr_test;
}catch(e){
  console.log( e );
  throw e;
}

});