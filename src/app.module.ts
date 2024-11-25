import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user.module";
import { TeetimeModule } from "./modules/teeTime.module";
import { HoleModule } from "./modules/hole.module";

export const MongoConnectionInfo = {
  url: process.env.DB_URL!,
};

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://duykhanh66242002:T2if94ynDDHDkEn3@golf-nest.snywf.mongodb.net/"
    ),
    UserModule,
    TeetimeModule,
    HoleModule,
  ],
})
export class AppModule {}
