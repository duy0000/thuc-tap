import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "../controllers/user.controller";
import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User, UserSchema } from "../entities/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService], //nhận dữ liệu từ fe chuyển cho service xử lí 1 tác vụ khác biệt
})
export class UserModule {}
