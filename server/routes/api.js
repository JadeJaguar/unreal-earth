import express from 'express'
import placeData from '../data/places.js'

const router = express.Router()

router.get('/places', (req, res) => {
  res.status(200).json(placeData)
})

router.get('/places/:slug', (req, res) => {
  const place = placeData.find(place => place.slug === req.params.slug)

  if (!place) {
    return res.status(404).json({ error: 'Place not found' })
  }

  res.status(200).json(place)
})

export default router
