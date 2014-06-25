define([
  'knockout',
  'jquery'
],function(
  ko,
  $
){
  var util = {};


  util.derive = function( sup, sub, proto ) {
    if( arguments.length == 2 && typeof sub != 'function' ){
      $.extend(sup.prototype, sub);
      return sup
    }

    var ret = function() {
      sup.apply( this, arguments );
      sub.apply( this, arguments );
    }

    $.extend( ret.prototype, sup.prototype, proto );
    return ret;
  }

  util.koModule = function( properties, skips, prototype ) {
    var keys = Object.keys(properties); 
    skips = skips ||[];
    var ret = function( init ) {
      var data = $.extend({}, properties, init);
      var self =  this;
      keys.forEach(function( k ){
        if( skips.indexOf(k) != -1 ){
          self[k] = data[k];
        } else {
          self[k] = $.isArray(data[k]) ? 
                      ko[ 'observableArray' ]( data[k].slice(0) ) :
                      ko[ 'observable' ]( data[k] );
        }
      });
    }
    $.extend( ret.prototype, prototype);
    return ret;
  }
  return util;
});