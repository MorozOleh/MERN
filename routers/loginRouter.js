const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const LoginSchema = require('../models/loginModel')
const Joi = require('joi');
const JWToken = require('jsonwebtoken')
const config = require('config')

const validate = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3),
        email: Joi.string().email(),
        phoneNumber: Joi.string().min(10),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]'))
            .min(8, 'utf-8'),

    })

    const { error } = schema.validate(req.body)

    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }

    next()
}

router.post('/registration', validate, async(req, res) => {
    const { password, email } = req.body
    const hashedPassword = await bcrypt.hash(password, 12);

    const isUser = await LoginSchema.findOne({ email })

    if (isUser) {
        return res.status(202).json({ message: 'user already exists', email: "user's already exist" })
    }

    const data = {...req.body, password: hashedPassword }

    try {
        const login = new LoginSchema({...data })
        await login.save()
    } catch (e) {
        return res.status(400).json({ message: e })
    }



    console.log('success')
    res.status(201).json({
        massage: 'success',
        data
    });
})

router.post('/login', async(req, res) => {


    const { email, password } = req.body

    console.log(email)

    const isUser = await LoginSchema.findOne({ email })

    // check if email is present on database

    if (!isUser) {
        return res.status(202).json({ message: 'credentials are incorrect' })
    }

    // check if password on database is equal to password from form;
    const isEqual = await bcrypt.compare(password, isUser.password)

    if (!isEqual) {
        return res.status(202).json({ message: 'credentials are incorrect' })
    }

    const token = await JWToken.sign(req.body, config.get('secret'))

    res.status(200).json({ message: "success", token, userId: isUser.id })
})

module.exports = router;