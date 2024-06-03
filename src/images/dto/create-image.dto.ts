import { IsNotEmpty } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty()
  trackId: string;
}
