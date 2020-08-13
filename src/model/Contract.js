const mongoose = require('mongoose');
const ContractSchema = mongoose.Schema({
   //requres product id and user id 
   contractNumber: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('Contracts', ContractSchema);