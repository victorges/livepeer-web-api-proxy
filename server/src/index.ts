require('dotenv').config()

import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

const allowOrigin = process.env.CORS_ALLOW_ORIGIN
app.use(!allowOrigin ? cors() : cors({ origin: allowOrigin }))

// must be after the call to expressWs above
import * as handlers from './handlers'

app.use('/api', handlers.api)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app
