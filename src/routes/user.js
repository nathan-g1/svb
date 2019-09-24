const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth')


router.get('/profile', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})


router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/signup', async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async (req, res) => {
   
    try {
        const { email, password } = req.body
        
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;