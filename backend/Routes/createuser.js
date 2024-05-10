const express = require('express')
const router = express.Router()
const User = require('../Models/User.js')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post("/createuser", [
    body('email', 'Invalid Email').isEmail(),
    body('name', 'Name must contain atleast 5 letters').isLength({ min: 5 }),
    body('password', 'Password must contain atleast 5 letters').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            }).then(res.json({ success: true }))

        } catch (error) {
            console.log(error);
            req.json({ success: false })

        }
    })
router.post("/loginuser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must contain atleast 5 letters').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            let email = req.body.email;
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid email" })
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Wrong Password" })
            }
            const data = {
                user: {
                    id: userData._id
                }
            }
            const authToken = jwt.sign(data, process.env.jwtSecret);
            // const authToken = jwt.sign(data, process.env.jwtSecret, { expiresIn: "30d" });
            return res.json({ success: true, authToken: authToken })

        } catch (error) {
            console.log(error);
            req.json({ success: false })

        }
    })
module.exports = router;