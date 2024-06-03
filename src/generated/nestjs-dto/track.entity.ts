
import {TrackLink} from './trackLink.entity'


export class Track {
  id: string ;
title: string ;
subtitle: string ;
backgroundColor: string ;
accentColor: string ;
backgroundImage: boolean ;
links?: TrackLink[] ;
releaseDate: Date ;
visible: boolean ;
}
