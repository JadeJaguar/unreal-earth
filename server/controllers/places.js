import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Rename the snake_case columns back to camelCase for the frontend
const placeColumns = `
  id, slug, name, country, type, image, tagline, description,
  best_time AS "bestTime",
  fun_fact AS "funFact"
`

const getPlaces = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search.trim() : ''

    let results

    if (search) {
      results = await pool.query(
        `SELECT ${placeColumns} FROM places
         WHERE name ILIKE $1 OR country ILIKE $1 OR type ILIKE $1
         ORDER BY id ASC`,
        [`%${search}%`]
      )
    }
    else {
      results = await pool.query(`SELECT ${placeColumns} FROM places ORDER BY id ASC`)
    }

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPlace = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT ${placeColumns} FROM places WHERE slug = $1`,
      [req.params.slug]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Place not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPlacePage = async (req, res) => {
  try {
    const results = await pool.query('SELECT id FROM places WHERE slug = $1', [req.params.slug])

    if (results.rows.length === 0) {
      return res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'))
    }

    res.status(200).sendFile(path.resolve(__dirname, '../public/place.html'))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getPlaces,
  getPlace,
  getPlacePage
}
