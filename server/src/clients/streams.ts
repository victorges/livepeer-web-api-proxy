import * as livepeer from './livepeer'

import {
  uniqueNamesGenerator,
  colors,
  adjectives,
  animals,
} from 'unique-names-generator'

export interface StreamInfo {
  humanId: string
  streamId: string
  streamKey?: string
  streamUrl: string
  playbackId: string
  playbackUrl: string
  stream?: livepeer.Stream
}

const livepeerApi = new livepeer.API()

const hidConfig = {
  dictionaries: [colors, adjectives, animals],
  separator: '-',
}
const humanIdGen = () => uniqueNamesGenerator(hidConfig).toLowerCase()

const streamToInfo = (
  humanId: string,
  stream: livepeer.Stream
): StreamInfo => ({
  humanId,
  streamId: stream.id,
  streamKey: stream.streamKey,
  streamUrl: livepeer.streamUrl(stream.streamKey),
  playbackId: stream.playbackId,
  playbackUrl: livepeer.playbackUrl(stream.playbackId),
  stream: stream,
})

const trimPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.substring(prefix.length) : str

export async function getOrCreateStream(
  prevStreamId?: string
): Promise<StreamInfo> {
  if (prevStreamId) {
    const stream = await livepeerApi.getStream(prevStreamId)
    if (stream) {
      return streamToInfo(trimPrefix(stream.name, 'web-'), stream)
    }
  }
  const humanId = humanIdGen()
  const stream = await livepeerApi.createStream(`web-${humanId}`)
  return streamToInfo(humanId, stream)
}
