import { pool } from './database.js'
import placeData from '../data/places.js'

const createPlacesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS places;

    CREATE TABLE IF NOT EXISTS places (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      tagline VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      best_time VARCHAR(255) NOT NULL,
      fun_fact TEXT NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 places table created successfully')
  } catch (err) {
    console.error('⚠️ error creating places table', err)
  }
}

const seedPlacesTable = async () => {
  await createPlacesTable()

  for (const place of placeData) {
    const insertQuery = {
      text: 'INSERT INTO places (slug, name, country, type, image, tagline, description, best_time, fun_fact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
    }

    const values = [
      place.slug,
      place.name,
      place.country,
      place.type,
      place.image,
      place.tagline,
      place.description,
      place.bestTime,
      place.funFact
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${place.name} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting place', err)
    }
  }

  await pool.end()
}

seedPlacesTable()
