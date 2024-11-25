import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hole } from "../entities/hole.schema";
import * as dotenv from "dotenv";
import { HoleDto } from "../controllers/dto/golfHole.dto";
import dayjs from "dayjs";

dotenv.config({ path: "dev.env" });
@Injectable()
export class HoleService {
  constructor(@InjectModel(Hole.name) private $holeModal: Model<Hole>) {}

  async createHole(hole: HoleDto) {
    const { nameHole, describeHole, linkImageHole, titleHole } = hole;
    const checkHole = await this.$holeModal.findOne({ nameHole });

    if (checkHole) {
      throw new HttpException("Tên này đã tồn tại", HttpStatus.CONFLICT);
    }

    const newHole = await this.$holeModal.create({
      nameHole,
      describeHole,
      linkImageHole,
      titleHole,
    });

    return {
      message: "Hố golf đã tạo thành công",
      data: newHole,
    };
  }
  async editHole(hole: HoleDto) {
    const { _id, nameHole, describeHole, linkImageHole, titleHole } = hole;
    const res = await this.$holeModal.findOne({ _id });
    const checkName = await this.$holeModal.findOne({ nameHole });
    if (!res) {
      throw new HttpException("Hố golf không tồn tại", HttpStatus.NOT_FOUND);
    }
    if (checkName) {
      throw new HttpException("Tên hố golf đã tồn tại", HttpStatus.NOT_FOUND);
    }
    if (nameHole) res.nameHole = nameHole;
    if (describeHole) res.describeHole = describeHole;
    if (linkImageHole) res.linkImageHole = linkImageHole;
    if (titleHole) res.titleHole = titleHole;
    const updatedHole = await res.save();
    return {
      message: "Cập nhật hố golf thành công",
      data: updatedHole,
    };
  }
  async getAllHole(uid: string) {
    const getAllHole = await this.$holeModal.find();
    return getAllHole;
  }
  async deleteHole(_id: string) {
    try {
      console.log("id nhận vào ", _id);

      const hole = await this.$holeModal.findById(_id);
      if (!hole) {
        throw new HttpException("Hố golf không tồn tại", HttpStatus.NOT_FOUND);
      }
      await this.$holeModal.deleteOne({ _id });
      console.log({ hole });

      return {
        statusCode: 200,
        message: "xóa thành công hố golf ",
      };
    } catch (error) {
      console.log({ error });

      throw new HttpException("Hố golf không tồn tại", HttpStatus.NOT_FOUND);
    }
  }
}
