const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
   //requres product id and user id 
   quantity: {
      type: number,
      required: true
   }
});

module.exports = mongoose.model('Orders', OrderSchema);