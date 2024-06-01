
import {MusicPlatform} from '@prisma/client'
import {Track} from './track.entity'


export class TrackLink {
  id: number ;
track?: Track ;
trackId: string ;
url: string ;
platform: MusicPlatform ;
}
