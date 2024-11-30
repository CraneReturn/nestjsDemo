import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET_KEY } from "./auth.jwt.secrect";
//鉴权 请求处理逻辑之前要处理的
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector,private JwtService:JwtService) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        //完成登陆验证 但是login不需要验证
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if(isPublic){
            return true;
        }
        //获取请求头
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        const token= extratTokenFromHeader(request);
        if(!token){
           throw new UnauthorizedException('no token');
        }
        try {
            const payload= await this.JwtService.verifyAsync(token,{
                secret:JWT_SECRET_KEY
            });
        
            request['user']=payload;
            console.log(payload);
            
            
        } catch (e) {
            
            throw new UnauthorizedException();
        }
        return true;
    }
}
function extratTokenFromHeader(request){
    const [type,token]=request.headers?.authorization.split(' ')??[];
    return type==='Bearer'?token:undefined;
}