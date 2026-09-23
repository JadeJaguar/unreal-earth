import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import placeData from '../data/places.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(placeData)
})

router.get('/:slug', (req, res) => {
  const place = placeData.find(place => place.slug === req.params.slug)

  if (!place) {
    return res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'))
  }

  res.status(200).sendFile(path.resolve(__dirname, '../public/place.html'))
})

export default router
