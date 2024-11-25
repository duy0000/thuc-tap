import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserRegisterDto, LoginDto } from "./dto/user.dto";
import { UserService } from "../services/user.service";
import { JwtAuthGuard } from "../utils/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  // Route không cần bảo vệ với guard, vì không yêu cầu xác thực
  @Post("register")
  async Register(@Body() body: UserRegisterDto) {
    const data = await this.userService.register(body);
    return data;
  }

  @Post("login")
  async Login(@Body() body: LoginDto) {
    const data = await this.userService.login(body);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get("user-profile/:uid")
  async userInfo(@Param("uid") uid: string) {
    const userInfo = await this.userService.getUserInfo(uid);

    if (!userInfo) {
      throw new HttpException(
        "Không tìm thấy thông tin người dùng",
        HttpStatus.NOT_FOUND
      );
    }

    return userInfo;
  }
}
