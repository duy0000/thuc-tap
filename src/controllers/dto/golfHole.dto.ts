import { IsNumber, IsString } from "class-validator";

export class HoleDto {
  @IsString()
  uid: string;
  @IsString()
  _id: string;
  @IsString()
  nameHole: string;
  @IsString()
  describeHole: string;
  @IsString()
  linkImageHole: string;
  @IsString()
  titleHole: string;
}
export class DeleteHoleDto {
  @IsString()
  uid: string;
  @IsString()
  id: string;
}
