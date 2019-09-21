const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
   orderId: {
      type: number,
      required: true
   },
   userId: {
      type: number,
      required: true
   },
   quantity: {
      type: number,
      required: true
   },
   productId: {
      type: [number],
      required: true
   }
});

module.exports = mongoose.model('Orders', OrderSchema);