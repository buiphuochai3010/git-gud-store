import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    // Strategy này dùng để validate user cho đăng nhập
    async validate(username_or_email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username_or_email, password);

        if (!user) {
            throw new UnauthorizedException('Tài khoản hoặc mật khẩu không hợp lệ');
        }
        
        if (!user.is_active) {
            throw new BadRequestException('Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản');
        }

        return user;
    }
}