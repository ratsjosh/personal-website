const express = require('express')
const Section = require('../models/section')
// const db = require('../db')

const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
  const secs = await Section.find()
    .select('-__v')
    .lean()
  res.render('index', {
    sections: secs,
    title: 'Yap Wei Jie Joshua',
    image1: 'https://s3-ap-southeast-1.amazonaws.com/nccmain/Landing/YOURE%20HOME/welcomecup08dec2017.jpg',
    image2: 'https://s3-ap-southeast-1.amazonaws.com/nccmain/Landing/NCTV05_20171116065338.jpg',
  })
})


module.exports = router
