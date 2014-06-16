define([
  'knockout',
  '../../libs/util'
],function(
  ko,
  util
){
  return util.derive (function produce_mgr (){
      this.factories = ko.observableArray([]);
      this.resources = ko.observableArray([]);
    },{
      produce : function( resources ){
        var factories = this.factories();
        var resources = this.resources()
                          .map(function( resource ){ return resource.current() });


        factories.forEach(function(factory){
          if ( !factory.running() ){
            return
          }
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
      },
      gain_income : function(){
        this.resources().forEach(function( resource ){ resource.gain_income() });
      }
    });
});