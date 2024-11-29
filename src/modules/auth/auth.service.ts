import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService:UserService) {

  }
 async login(username,password){
  //先去查询有无该username
  const user =this.userService.findByUsername(username);
  // if(!user){
  //  return null;
  // }
  // //再去查询密码是否正确
  // const isPasswordValid = await this.comparePassword(password,user.password);
  // if(!isPasswordValid){
  //  return null;
  // }
  // return user;
  console.log(user,'22222');
  return user
 }
}