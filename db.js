/* eslint consistent-return: 0 */
const { MongoClient } = require('mongodb')

const state = {
  database: null,
}

exports.connect = (url, done) => {
  if (state.database) return done()

  MongoClient.connect(url, (err, database) => {
    if (err) return done(err)
    state.database = database
    done()
  })
}

exports.get = collection => state.database.db(collection)

exports.close = (done) => {
  if (state.db) {
    state.db.close((err) => {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
