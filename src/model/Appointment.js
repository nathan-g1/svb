
const mongoose = require('mongoose');
const AppointmentSchema = mongoose.Schema({
    // requires physicians id(user) and time(date & hour range)
    physicianId: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: false
    },
    patientNumber: {
        type: Number,
        require: false
    },
    patientId: {
        type: [String],
        require: false
    },
    shift: {
        type: String,
        require: false
    },
    booked: {
        type: Boolean,
        require: true,
        default: false
    },
    physicianName: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);