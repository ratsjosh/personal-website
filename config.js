require('dotenv').config()

const cfg = {}

// MongoDB connection string - MONGO_URL is for local dev,
// MONGO_URI is for the MongoLab add-on for Heroku deployment
cfg.mongoUrl = `${process.env.DB_URL}${process.env.DB_COLLECTION}`

// Export configuration object
module.exports = cfg
