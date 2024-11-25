import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TeeTime } from "../entities/teeTime.schema";
import * as dotenv from "dotenv";
import { TeeTimeDto } from "../controllers/dto/teeTime.dto";
import dayjs from "dayjs";
import { log } from "console";

dotenv.config({ path: "dev.env" });
@Injectable()
export class TeeTimeService {
  constructor(
    @InjectModel(TeeTime.name) private $teeTimeModal: Model<TeeTime>
  ) {}

  async createTeetime(teetime: TeeTimeDto) {
    const {
      timeStart,
      Caddie,
      people,
      car,
      day2,
      price2,
      sale2,
      day3,
      price3,
      sale3,
      day4,
      price4,
      sale4,
      day5,
      price5,
      sale5,
      day6,
      price6,
      sale6,
      day7,
      price7,
      sale7,
      day8,
      price8,
      sale8,
    } = teetime;

    const priceWeek = [
      { day: day2, price: price2, sale: sale2 },
      { day: day3, price: price3, sale: sale3 },
      { day: day4, price: price4, sale: sale4 },
      { day: day5, price: price5, sale: sale5 },
      { day: day6, price: price6, sale: sale6 },
      { day: day7, price: price7, sale: sale7 },
      { day: day8, price: price8, sale: sale8 },
    ];

    const checkTeetime = await this.$teeTimeModal.findOne({ timeStart });

    if (checkTeetime) {
      throw new HttpException("Teetime đã tồn tại", HttpStatus.CONFLICT);
    }

    const newTeetime = await this.$teeTimeModal.create({
      timeStart,
      Caddie,
      people,
      car,
      priceWeek,
    });

    return {
      message: "Teetime đã tạo thành công",
      data: newTeetime,
    };
  }

  async editTeetime(teetime: any) {
    const {
      _id,
      uid,
      timeStart,
      Caddie,
      people,
      car,
      day2,
      price2,
      sale2,
      day3,
      price3,
      sale3,
      day4,
      price4,
      sale4,
      day5,
      price5,
      sale5,
      day6,
      price6,
      sale6,
      day7,
      price7,
      sale7,
      day8,
      price8,
      sale8,
    } = teetime;

    if (!uid) {
      throw new HttpException("UID là bắt buộc", HttpStatus.BAD_REQUEST);
    }

    const existingTeetime = await this.$teeTimeModal.findOne({ _id });

    if (!existingTeetime) {
      throw new HttpException("Teetime không tồn tại", HttpStatus.NOT_FOUND);
    }

    if (timeStart) existingTeetime.timeStart = timeStart;
    if (Caddie) existingTeetime.Caddie = Caddie;
    if (people) existingTeetime.people = people;
    if (car) existingTeetime.car = car;

    const priceWeek = [
      { day: day2, price: price2, sale: sale2 },
      { day: day3, price: price3, sale: sale3 },
      { day: day4, price: price4, sale: sale4 },
      { day: day5, price: price5, sale: sale5 },
      { day: day6, price: price6, sale: sale6 },
      { day: day7, price: price7, sale: sale7 },
      { day: day8, price: price8, sale: sale8 },
    ];

    existingTeetime.priceWeek = priceWeek;
    const updatedTeetime = await existingTeetime.save();

    return {
      message: "Cập nhật teetime thành công",
      data: updatedTeetime,
    };
  }

  async getAllTeetime(day: string) {
    const getAllTeetime = await this.$teeTimeModal.find();
    if (getAllTeetime.length === 0)
      throw new HttpException("Không có Teetime nào", HttpStatus.NOT_FOUND);
    const result = getAllTeetime.map((teetime) => {
      const filteredPriceWeek = teetime.priceWeek.filter(
        (price) => price.day === day
      );
      return {
        ...teetime.toObject(),
        priceWeek: filteredPriceWeek,
      };
    });

    return result;
  }
  async deleteTeetime(_id: string) {
    if (!_id)
      throw new HttpException(
        "Không tìm thấy Id TeeTime",
        HttpStatus.NOT_FOUND
      );
    try {
      const teetime = await this.$teeTimeModal.findById(_id);
      if (!teetime) {
        throw new HttpException("Teetime không tồn tại", HttpStatus.NOT_FOUND);
      }
      await this.$teeTimeModal.deleteOne({ _id });
      console.log({ teetime });

      return {
        statusCode: 200,
        message: "xóa thành công Teetime ",
      };
    } catch (error) {
      console.log({ error });

      throw new HttpException("Teetime không tồn tại", HttpStatus.NOT_FOUND);
    }
  }
}
