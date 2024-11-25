import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Headers,
  UseGuards,
  HttpException,
  HttpStatus,
  Delete,
} from "@nestjs/common";
import { TeeTimeDto, GetListTeetime } from "./dto/teeTime.dto";
import { TeeTimeService } from "../services/teeTime.service";
import { JwtAuthGuard } from "../utils/jwt-auth.guard";

@Controller("tee-time")
export class TeeTimeController {
  constructor(private TeeTimeService: TeeTimeService) {}
  @UseGuards(JwtAuthGuard)
  @Post("create-teetime")
  async createTeetime(@Body() body: TeeTimeDto) {
    const data = await this.TeeTimeService.createTeetime(body);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Patch("edit-teetime")
  async editTeetime(@Body() body: TeeTimeDto) {
    const data = await this.TeeTimeService.editTeetime(body);

    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Post("all-teetime")
  async getAllTeetime(@Body() body: GetListTeetime) {
    const data = await this.TeeTimeService.getAllTeetime(body.day);

    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Post("delete-teetime")
  async deleteTeetime(@Body() body: { uid: string; id: string }) {
    const data = await this.TeeTimeService.deleteTeetime(body.id);

    return data;
  }
}
