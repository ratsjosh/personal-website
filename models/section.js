// grab the things we need
const mongoose = require('mongoose')

const { Schema } = mongoose

// create a schema
const sectionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
})

// the schema is useless so far
// we need to create a model using it
const Section = mongoose.model('Section', sectionSchema)

// make this available in our Node applications
module.exports = Section
