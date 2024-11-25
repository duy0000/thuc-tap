import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../entities/user.schema";
import { LoginDto, UserRegisterDto } from "../controllers/dto/user.dto";

import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config({ path: "dev.env" });
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private $userModal: Model<User>) {}

  async register(user: UserRegisterDto) {
    const { name, password, username, gmail } = user;
    const checkUser = await this.$userModal.findOne({ username });

    if (checkUser) {
      throw new HttpException("người dùng đã tồn tại", HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.$userModal.create({
      name,
      username,
      // uid:
      //   Math.random().toString(36).substring(2, 7) +
      //   Math.random().toString(36).substring(2, 7),
      password: hashedPassword,
      gmail,
      phoneNumber: "",
      role: "user",
      avatar: "",
      createAt: dayjs().format("DD-MM-YYYY HH:mm"),
      updateAt: dayjs().format("DD-MM-YYYY HH:mm"),
    });

    throw new HttpException("Đăng kí thành công", HttpStatus.OK);
  }

  async login(user: LoginDto) {
    const { username, password } = user;
    const checkUser = await this.$userModal.findOne({ username });

    if (!checkUser) {
      throw new HttpException(
        "Tên đăng nhập hoặc email không đúng",
        HttpStatus.NOT_FOUND
      );
    }
    // console.log({ checkUser });

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      throw new HttpException("Password không đúng", HttpStatus.NOT_FOUND);
    }

    const payload = {
      id: checkUser.id,
      sub: checkUser.id,
    };

    const AccessToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "30d",
    });

    return { access_token: AccessToken, uid: checkUser.id };
  }

  async getUserInfo(userId: string) {
    const userInfo = await this.$userModal.findById(userId).select("-password"); // Lấy thông tin người dùng ngoại trừ password

    if (!userInfo) {
      throw new HttpException("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
    }

    return userInfo;
  }
}
