import { TrackLinkDto } from "./track-link.dto";

export class UpdateTrackDto {
  title: string;
  subtitle: string;
  backgroundColor: string;
  accentColor: string;
  backgroundImage: boolean;
  releaseDate: Date;
  links: TrackLinkDto[];
}
