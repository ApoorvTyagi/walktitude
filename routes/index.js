const router = require('express').Router()
const { fetchNearestWalker, updateLocation } = require('../models/repository')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, (_req, res) => {
  res.render('login')
})

router.get("/login", ensureAuth, async (req, res) => {
  res.render('index', { userinfo: req.user })
})

router.post("/update", async (req, res) => {
  console.log(req)
  const latitude = Number(req.body.lat)
  const longitude = Number(req.body.lng)
  const googleId = req.body.googleId
  const result =  await updateLocation(longitude, latitude, googleId)
  res.json({
    result
  })
})

router.get("/walkers", async (req, res) => {
  const latitude = Number(req.query.lat);
  const longitude = Number(req.query.lng);
  const nearestWalkers = await fetchNearestWalker([longitude, latitude], process.env.NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH);
  res.json({
    walkers: nearestWalkers
  });
})

module.exports = router;