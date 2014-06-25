define([
  './util'
],function(
  util
){
  return util.derive(function( runner, interv ) {
      this.interv = interv;
      this.runner = runner;
    },{
      run : function() {
        var self = this;
        this.timer = setTimeout(function(){
          self.runner();
          self.run();
        },self.interv);
      },
      pause : function() {
        this.timer = clearTimeout(this.timer);
      }
    })
});