const express = require('express')
const db = require('../db')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  const database = db.get(process.env.DB_COLLECTION)
  database.collection('quotes').find().toArray((err, docs) => {
    res.render('index', { quotes: docs, title: 'Yap Wei Jie Joshua' })
  })
})


module.exports = router
