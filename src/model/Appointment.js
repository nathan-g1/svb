
const mongoose = require('mongoose');
const AppointmentSchema = mongoose.Schema({
    // requires physicians id(user) and time(date & hour range)
    physicianId: {
        type: String,
        require: true
    },
    startingHour: {
        type: String,
        require: true
    },
    finishingHour: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: false
    },
    patientId: {
        type: String,
        require: false
    },
    selectedHour: {
        type: Date,
        require: false
    },
    booked: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);