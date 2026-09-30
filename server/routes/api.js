import express from 'express'
import PlacesController from '../controllers/places.js'

const router = express.Router()

router.get('/places', PlacesController.getPlaces)

router.get('/places/:slug', PlacesController.getPlace)

export default router
