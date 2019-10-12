const express = require('express');
const router = express.Router();
const Appointment = require('../model/Appointment');
// ===========================================================================================
// check current users login status/type/session for all the http methods using a middleware |
// ===========================================================================================
router.get('/', async (req, res) => {
    // requires the front-end to send the type of the user
    console.log('request to all the appointments');
    try {
        // if (Object.keys(req.body).length === 0) {
        //     return res.json({ message: 'operation not allowed for unauthorized user' });
        // }
        // if (req.body.user.type !== 'phy') {
        //     return res.json({ message: 'operation not allowed for this user' });
        // }
        const appointments = await Appointment.find({ "booked": false });
        return res.json(appointments);
    } catch (err) {
        return res.send({ message: err });
    }
});
router.post('/add', async (req, res) => {
    // requires the front-end to send the user object
    console.log(`adding appointment for physician ${req.body.user.name}`);
    const newAppointment = new Appointment({
        physicianId: req.body.user._id,
        startingHour: req.body.appointment.startingHour,
        finishingHour: req.body.appointment.finishingHour,
        note: req.body.appointment.note
    });
    try {
        if (req.body.user.type !== 'phy') {
            return res.json({ message: 'operation not allowed for this user' });
        }
        const _appointmnet = await newAppointment.save();
        return res.json(_appointmnet);
    } catch (err) {
        return res.send({ message: err });
    }
});
// searches appointments using appointmentId and books for specific patient 
router.put('/book/:id', async (req, res) => {
    console.log(`booking patient on appointment`);
    try {
        if (req.body.user.type !== 'ptn') {
            return res.json({ message: 'operation not allowed for this user' });
        }
        const _bookedAppointment = req.body.appointment.booked = true;
        await Appointment.findByIdAndUpdate({ _id: req.params.id }, _bookedAppointment);
        const bookedAppointment = await Appointment.findOne({ _id: req.params.id });
        return res.json(bookedAppointment);
    } catch (err) {
        return res.send({ message: err });
    }
});


// get appointment by appointment id
router.get('/:id', async (req, res) => {
    console.log(`get appointment with id ${req.params.id}`);
    try {
        const singleAppointmentInfo = await Appointment.findOne({ _id: req.params.id });
        return res.json(singleAppointmentInfo);
    } catch (err) {
        return res.send({ message: err });
    }
});

// get appointment by a specific physician
router.get('/physician/:id', async (req, res) => {
    console.log(`get appointment with physician id ${req.params.id}`);
    try {
        const singleAppointmentInfoByPhysician = await Appointment.find({ physicianId: req.params.id });
        return res.json(singleAppointmentInfoByPhysician);
    } catch (err) {
        return res.send({ message: err });
    }
});

// get appointments by patient
router.get('/patient/:id', async (req, res) => {
    console.log(`get appointment details of patient ${req.params.id}`);
    try {
        const appointmentInfo = await Appointment.findOne({ patientId: req.params.id });
        return res.json(appointmentInfo);
    } catch (err) {
        return res.send({ message: err });
    }
});
// delete appointment with id
router.delete('/delete/:id', async (req, res) => {
    console.log(`delete appointment with appointment id ${req.params.id}`);
    try {
        if (req.body.user.type !== 'phy') {
            return res.json({ message: 'operation not allowed for this user' });
        }
        const appointmentInfo = await Appointment.findByIdAndDelete({ _id: req.params.id });
        return res.json(appointmentInfo);
    } catch (err) {
        return res.send({ message: err });
    }
});
module.exports = router;