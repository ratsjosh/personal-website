const _ = require('lodash')
const express = require('express')
const Section = require('../../models/section')

const router = express.Router()

// POST: /
router.post('/', async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length > 0) {
      const section = new Section({
        name: req.body.name,
        title: req.body.title,
        subtitle: req.body.subtitle,
      })
      await section.save()
      res.send()
    }
    res.status(500).send()
  } catch (e) {
    res.status(500).send(e)
  }
  res.send()
})

module.exports = router
