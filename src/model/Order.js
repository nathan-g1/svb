const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
   //requres product id and user id 
   quantity: {
      type: Number,
      required: true
   },
   productId: {
      type: String,
      require: true
   },
   productData: {
      type: Object,
      require: true
   },
   userInfo: {
      type: Object,
      require: true
   },
   description: {
      type: String,
      require: false
   }

});

module.exports = mongoose.model('Orders', OrderSchema);