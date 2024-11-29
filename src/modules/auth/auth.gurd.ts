import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./public.decorator";
//鉴权 请求处理逻辑之前要处理的
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //完成登陆验证 但是login不需要验证
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if(isPublic){
            return true;
        }
        return undefined;
    }
}