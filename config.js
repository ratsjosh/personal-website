require('dotenv').config()

const cfg = {}

// MongoDB connection string - MONGO_URL is for local dev,
// MONGO_URI is for the MongoLab add-on for Heroku deployment
cfg.mongoUrl = `${process.env.DB_URL}${process.env.DB_COLLECTION}`

cfg.googleClientId = process.env.CLIENT_ID
cfg.googleClientSecret = process.env.CLIENT_SECRET
cfg.googleRedirectUrl = process.env.CLIENT_REDIRECT_URL
cfg.sessionSecret = process.env.SESSION_SECRET

// Export configuration object
module.exports = cfg
