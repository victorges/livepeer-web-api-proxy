import express from 'express'

import { getOrCreateStream } from '../clients/streams'
import { extractStreamKey } from '../clients/livepeer'

const api = express.Router()

const cookieMaxAgeMs = 7 * 24 * 60 * 60 * 1000
const cookieName = 'livepeer-stream-id'

api.post('/stream/init', async (req, res) => {
  const prevStreamId = req.cookies[cookieName]
  const { playbackId, playbackUrl, streamId, streamKey, streamUrl } =
    await getOrCreateStream(prevStreamId)

  if (streamId !== prevStreamId) {
    res.cookie(cookieName, streamId, {
      maxAge: cookieMaxAgeMs,
      httpOnly: true,
    })
  }
  res.json({
    playbackId,
    playbackUrl,
    streamKey: streamKey ?? extractStreamKey(streamUrl),
    streamUrl,
  })
})

api.all('*', (req, res) => {
  res.status(404).json({
    code: 'not_found',
    message: `No API at path ${req.path}`,
  })
})

export { api }
