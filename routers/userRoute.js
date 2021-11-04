const express = require('express');
const router = express.Router();

const users = require('../data/users.json')



router.route('')
    .get((req, res) => {
        let filteredUsers = users

        const { hasSpouse, empty } = req.query;

        if (hasSpouse) {
            filteredUsers = filteredUsers.filter(user => {
                return String(user.hasSpouse) === hasSpouse
            })
        }

        if (empty) {
            filteredUsers = [];
        }

        if (!filteredUsers.length) {
            return res.status(200).send('users are not found')

        }

        res.json(filteredUsers)

    })


router.get('/:id', (req, res) => {
    const params = req.params
    const singleUser = users.filter(({ id }) => +params.id === id)

    res.json(singleUser)
})

module.exports = router