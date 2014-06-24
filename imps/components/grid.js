define([
  'knockout',
  '../../libs/util'
],function(
  ko,
  util
){
  return util.derive(util.koModule({
      unit : undefined,
      pos  : 0,
      grids: undefined
    },['pos']),function() {
      this.empty =  ko.computed(function() {
                      return !this.unit();
                    },this)
    })
});