import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request } from "express"; // Import Request từ express

// Load biến môi trường từ file .env
dotenv.config({ path: "dev.env" });

const secretKey = process.env.JWT_KEY; // Đảm bảo rằng JWT_KEY có giá trị trong file .env

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]; // Lấy token từ header

    if (!token) {
      throw new HttpException(
        "Token không được cung cấp",
        HttpStatus.UNAUTHORIZED
      );
    }

    if (!token.startsWith("Bearer ")) {
      throw new HttpException("Token không hợp lệ", HttpStatus.UNAUTHORIZED);
    }

    const extractedToken = token.split(" ")[1]; // Lấy token sau 'Bearer '

    const uid = request.params?.uid || request.body?.uid || request.query?.uid;
    if (!uid) {
      throw new HttpException(
        "Không tìm thấy id người dùng",
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      // Giải mã token và kiểm tra với uid
      const decoded = jwt.verify(extractedToken, secretKey);
      // chỉ khi token còn hạn thiwf mới giải mã được nếu không sẽ ném ra lỗi

      // Kiểm tra sự khớp giữa ID trong token và UID từ request
      if (decoded?.id !== uid) {
        throw new HttpException(
          "Id người dùng và token không trùng khớp",
          HttpStatus.FORBIDDEN
        );
      }
    } catch (error) {
      console.error("Lỗi xác thực token:", error);
      throw new HttpException(
        "Id người dùng và token không trùng khớp",
        HttpStatus.UNAUTHORIZED
      );
    }

    return true; // Cho phép yêu cầu tiếp tục
  }
}
