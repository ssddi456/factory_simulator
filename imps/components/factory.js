define([
  './progress',
  '../../libs/util',
  'knockout'
],function(
  progress,
  util,
  ko
){
  return util.derive(progress,function( name, products ) {
    this.name(name);
    this.resource_require = ko.observableArray([30]);
    this.products = new products();
    this.running  = ko.observable(true);
  },{
    produce : function(){
      this.products.increase();

      var running = !this.products.complete();
      this.running( running );
    }
  });
});