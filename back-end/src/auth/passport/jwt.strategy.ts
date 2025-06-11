import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
        });
    }

    async validate(payload: any) {
        try {
            const account_id = payload.sub;

            const account = await this.prisma.account.findFirst({
                where: {
                    id: account_id,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    account_type: true,
                }
            })

            return account;
        } catch (error) {
            console.error('[JwtStrategy][validate] error', error);
            throw error;
        }
    }
}