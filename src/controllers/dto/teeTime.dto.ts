import { IsNumber, IsString } from "class-validator";

export class TeeTimeDto {
  @IsString()
  uid: string;
  @IsString()
  timeStart: string;

  @IsNumber()
  Caddie: number;

  @IsNumber()
  people: number;
  @IsNumber()
  car: number;

  @IsString()
  day2: string;
  @IsNumber()
  price2: number;
  @IsNumber()
  sale2: number;

  @IsString()
  day3: string;
  @IsNumber()
  price3: number;
  @IsNumber()
  sale3: number;

  @IsString()
  day4: string;
  @IsNumber()
  price4: number;
  @IsNumber()
  sale4: number;

  @IsString()
  day5: string;
  @IsNumber()
  price5: number;
  @IsNumber()
  sale5: number;

  @IsString()
  day6: string;
  @IsNumber()
  price6: number;
  @IsNumber()
  sale6: number;

  @IsString()
  day7: string;
  @IsNumber()
  price7: number;
  @IsNumber()
  sale7: number;

  @IsString()
  day8: string;
  @IsNumber()
  price8: number;
  @IsNumber()
  sale8: number;
}

export class GetListTeetime {
  @IsString()
  uid: string;
  @IsString()
  day: string;
}
