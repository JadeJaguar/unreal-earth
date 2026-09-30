import express from 'express'
import PlacesController from '../controllers/places.js'

const router = express.Router()

router.get('/:slug', PlacesController.getPlacePage)

export default router
