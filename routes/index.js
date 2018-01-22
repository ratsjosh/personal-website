const express = require('express')
const db = require('../db')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  const database = db.get(process.env.DB_COLLECTION)
  database.collection('quotes').find().toArray((err, docs) => {
    res.render('index', {
      quotes: docs,
      title: 'Yap Wei Jie Joshua',
      image1: 'https://s3-ap-southeast-1.amazonaws.com/nccmain/Landing/YOURE%20HOME/welcomecup08dec2017.jpg',
      image2: 'https://s3-ap-southeast-1.amazonaws.com/nccmain/Landing/NCTV05_20171116065338.jpg',
    })
  })
})


module.exports = router
