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
  var vm = {};
  var k;

  function progress (){
    this.max     = ko.observable(100);
    this.current = ko.observable(0);
    this.name    = ko.observable('');
  };

  for ( k in ko ){
    if( ko.hasOwnProperty(k)){
      console.log( k );
    }
  }
  vm.factories = ko.observableArray([]);

  function factory ( name, products ){
    progress.call(this);
    this.name  = name;
    this.resource_require = ko.observableArray([30]);
    this.products = new products();
  }
  var fp = factory.prototype;
  fp.produce = function(){
    this.products.count( this.products.count() + 1 );
  }

  function product (){
    this.name = '';
  }

  function products (){
    this.name = 'test product';
    this.count= ko.observable(0);
  }

  function resource ( name ){
    this.income = ko.observable(10);
    this.current= ko.observable(0);
    this.max    = ko.observable(1000);
    this.name   = name;
  }
  var rp = resource.prototype;
  rp.gain_income = function(){
    this.current( Math.min(this.current() + this.income(),this.max()) );
  }

  function produce_mgr (){
    this.factories = ko.observableArray([]);
    this.resources = ko.observableArray([]);
  }

  var prp = produce_mgr.prototype;

  prp.produce = function( resources ){
    var factories = this.factories();
    var resources = this.resources()
                      .map(function( resource ){ return resource.current() });


    factories.forEach(function(factory){
      var resource_require = factory.resource_require()
      var match_require = Math.min(
                            resource_require
                              .map(function( val, idx ){
                                return 0 + (resources[idx] > val );
                              })
                          ) == 1;
      if ( match_require ){
        factory.produce();
        resource_require.forEach(function( val, idx ){
          resources[idx] -= val;
        });
      }
    });

    this.resources()
      .forEach(function( resource, idx ){ 
        resource.current( resources[idx] ) 
      });
  };
  prp.gain_income = function(){
    this.resources().forEach(function( resource ){ resource.gain_income() });
  };

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
    produce_mgr_test.produce();

    setTimeout(arguments.callee,1e3);
  },1e3);

  ko.applyBindings ( produce_mgr_test );

});