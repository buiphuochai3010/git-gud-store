import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY , [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) return true;
        
        return super.canActivate(context)
    }

    handleRequest(error: any, account: any, info: any) {
        if (error || !account) {
            throw error || new UnauthorizedException("Access Token không hợp lệ hoặc không có tại header!");
        }
        return account;
    }
}