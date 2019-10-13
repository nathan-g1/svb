const mongoose = require('mongoose');
const SubscriptionSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
