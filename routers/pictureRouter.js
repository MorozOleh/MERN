const express = require('express')
const pictures = require("../data/pictures")
const router = express.Router()

const length = pictures.length;



router.get('/', (req, res) => {
    let returnedPictures = pictures;

    const { limit, page } = req.query

    if (limit && page) {
        const start = Number(page) > 0 ? (Number(page) - 1) * limit : 0;
        const finish = Number(start) + Number(limit)

        return res.json({
            images: returnedPictures.slice(start, finish),
            total: length
        })
    }

    res.json({
        images: pictures,
        total: length,
    })
})




module.exports = router;