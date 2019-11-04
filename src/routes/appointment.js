const express = require('express');
const router = express.Router();
const Appointment = require('../model/Appointment');
const User = require('../model/User');

// ===========================================================================================
// check current users login status/type/session for all the http methods using a middleware |
// ===========================================================================================
router.get('/all/:bool', async (req, res) => {
    // requires the front-end to send the type of the user
    console.log('request to all the appointments');
    try {
        if (req.params.bool === 'none') {
            const appointments = await Appointment.find();
            return res.json(appointments);
        }
        if (req.params.bool === 'true') {
            const appointments = await Appointment.find();
            return res.json(appointments);
        }
        if (req.params.bool === 'false') {
            const appointments = await Appointment.find({ "booked": false });
            return res.json(appointments);
        }
        return res.json({ message: 'wrong URL path' });
    } catch (err) {
        return res.send({ message: err });
    }
});
router.post('/add', async (req, res) => {
    // requires the front-end to send the user object
    const newAppointment = new Appointment({
        physicianId: req.body.id,
        note: req.body.note,
        physicianName: req.body.physicianName,
        shift: req.body.shift,
        date: new Date(req.body.date),
        patientNumber: req.body.patientNumber
    });
    try {
        const _appointmnet = await newAppointment.save();
        return res.json(_appointmnet);
    } catch (err) {
        return res.send({ message: err.message });
    }
});
// searches appointments using appointmentId and books for specific patient 
router.put('/book/:id', async (req, res) => {
    console.log(`booking patient on appointment`);
    try {
        const userIdArr = await Appointment.findOne({ _id: req.params.id });
        const ar = userIdArr.patientId;
        const book = false;
        if (!ar.includes(req.body.userId)) {
            ar.push(req.body.userId);
        }
        if (ar.length === userIdArr.patientNumber) {
            book = true;
        }
        const _bookedAppointment = {
            booked: book,
            patientId: ar
        }
        await Appointment.findByIdAndUpdate({ _id: req.params.id }, _bookedAppointment);
        const bookedAppointment = await Appointment.findOne({ _id: req.params.id });
        return res.json(bookedAppointment);
    } catch (err) {
        return res.send({ message: err });
    }
});

// searches appointments using appointmentId and deletes booked appointments
router.put('/undo/book/:id', async (req, res) => {
    console.log(`undo booking from appointment`);
    try {
        const userIdArr = await Appointment.findOne({ _id: req.params.id });
        const ar = userIdArr.patientId;
        const book = false;
        const index = ar.indexOf(req.body.userId);
        if (index > -1) {
            ar.splice(index, 1);
        }
        if (ar.length === userIdArr.patientNumber) {
            book = true;
        }
        const _bookedAppointment = {
            booked: book,
            patientId: ar
        }
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
        const appointmentInfo = await Appointment.findByIdAndDelete({ _id: req.params.id });
        return res.json(appointmentInfo);
    } catch (err) {
        return res.send({ message: err });
    }
});
module.exports = router;