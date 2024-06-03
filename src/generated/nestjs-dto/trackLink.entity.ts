
import {MusicPlatform} from '@prisma/client'
import {Track} from './track.entity'


export class TrackLink {
  track?: Track ;
trackId: string ;
url: string ;
platform: MusicPlatform ;
}
