define([
  './product',
  './progress',
  '../../libs/util',
  'knockout'
],function(
  product,
  progress,
  util,
  ko
){

  //
  // resource_require : () how much resource are need for current produce
  // 
  //
  //
  return util.koModule({
    name               : '',
    current_product    : undefined,
    waiting_queue      : [],
    max_waiting_len    : 4,
    storehouse         : undefined
  },[
    'storehouse'
  ],{
    produce : function(){
      var len = this.waiting_queue().length;
      var current_product = this.current_product();

      if( current_product ){
        if( current_product.complete() ){
          this.storehouse.push( current_product );

          if( len > 0 ){
            this.current_product(this.waiting_queue.shift());
          } else {
            this.current_product( undefined );
          }
        } else{
          current_product.increase();
        }
      }

    },
    add_product : function( product ) {
      if( !this.current_product() ){
        this.current_product( product );
        return true;
      }
      if( this.waiting_queue().length < this.max_waiting_len() ){
        this.waiting_queue.push( product );
        return true;
      }
      return false;
    },
    add_product_from_data : function( data ) {
      this.add_product( new product(data) );
    }
  }).derive(function( option ) {
    this.unit_data = [];
    if( option.unit_data ){
      for(var k in option.unit_data){
        this.unit_data.push( option.unit_data[k]);
      }
    }
  });
});