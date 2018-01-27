// grab the things we need
const mongoose = require('mongoose')

const { Schema } = mongoose

// create a schema
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  leadParagraph: String,
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
})

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available in our Node applications
module.exports = User
