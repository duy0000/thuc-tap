import { IsNotEmpty, MinLength, IsString } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  gmail: string;
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;
}
export class getinfoDto {
  @IsString()
  uid: string;
}
