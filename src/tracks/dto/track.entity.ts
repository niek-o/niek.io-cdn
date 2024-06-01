
import {TrackLink} from './trackLink.entity'


export class Track {
  id: string ;
title: string ;
subtitle: string ;
buttonColor: string ;
buttonTextColor: string ;
backgroundColor: string ;
iconColor: string ;
backgroundImage: boolean ;
links?: TrackLink[] ;
}
