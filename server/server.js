import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRouter from './routes/api.js'
import pagesRouter from './routes/pages.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter)
app.use('/places', pagesRouter)

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
