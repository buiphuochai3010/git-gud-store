import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
// Guard này dùng để khai báo global cho AuthGuard('local')
export class LocalAuthGuard extends AuthGuard('local') {}