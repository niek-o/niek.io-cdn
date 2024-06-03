import { CreateTrackDto } from "./create-track.dto";

export class Track {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  accentColor: string;
  backgroundImage: boolean;
  releaseDate: Date;
  visible: boolean;

  constructor(track: CreateTrackDto) {
    this.id = track.id;
    this.title = track.title;
    this.subtitle = track.subtitle;
    this.backgroundColor = track.backgroundColor;
    this.accentColor = track.accentColor;
    this.backgroundImage = track.backgroundImage;
    this.releaseDate = track.releaseDate;
    this.visible = false;
  }
}
