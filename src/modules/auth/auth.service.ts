import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as md5 from 'md5';
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService,
  ) {

  }
  async login(username, password) {
    //先去查询有无该username
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();
    if (user.password !== md5Password) {
      throw new UnauthorizedException('用户名或者密码错误');
    }
    const payload = { username: user.username, userid: user.id }
    return {
      token:await this.jwtService.signAsync(payload),
    }
  }
}