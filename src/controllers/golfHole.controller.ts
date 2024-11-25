import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { HoleDto, DeleteHoleDto } from "./dto/golfHole.dto";
import { HoleService } from "../services/hole.service";
import { JwtAuthGuard } from "../utils/jwt-auth.guard";

@Controller("hole")
export class HoleController {
  constructor(private holeService: HoleService) {}

  // Route không cần bảo vệ với guard, vì không yêu cầu xác thực
  @UseGuards(JwtAuthGuard)
  @Post("create-hole")
  async createHole(@Body() body: HoleDto) {
    const data = await this.holeService.createHole(body);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Patch("edit-hole")
  async editHole(@Body() body: HoleDto) {
    const data = await this.holeService.editHole(body);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get("get-all-hole")
  async getAllHole(@Body() uid: string) {
    const data = await this.holeService.getAllHole(uid);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Post("delete-hole")
  async deleteHole(@Body() body: DeleteHoleDto) {
    console.log("id từ fe", body.id);

    const data = await this.holeService.deleteHole(body.id);

    return data;
  }
}
