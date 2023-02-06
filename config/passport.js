const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Profile } = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          emailId: profile.emails[0].value
        }

        //find the user in our database 
        let user = await Profile.findOne({ googleId: profile.id })
        if (!user) {
          user = await Profile.create(newUser)
        }
        done(null, user)
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    Profile.findById(id, (err, user) => done(err, user))
  })
} 