import { TrackLinkDto } from "./track-link.dto";

export class CreateTrackDto {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  accentColor: string;
  backgroundImage: boolean;
  releaseDate: Date;
  links: TrackLinkDto[];
}
