import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "./create-user-dto";

@Injectable()
export class UserService{
    //用于注入typeorm的仓库 Repository是typeorm提供的仓库类 用于与数据库进行交互
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        
    }
    //单个查询
    findOne(id:number):Promise<User> {
        return this.userRepository.findOneBy({id});
    }
    findAll() :Promise<User[]>{
      return this.userRepository.find();
    }
    addUser(createUserDto:CreateUserDto):Promise<User> {
        const user=new User();
        user.username=createUserDto.username;
        user.password=createUserDto.password;
        user.active=1;
        user.role=createUserDto.role;
        user.avatar=createUserDto.avatar;
        user.nickname=createUserDto.nickname;
        return this.userRepository.save(user);
    }
    deleteUser(id: number):Promise <DeleteResult>{
        return this.userRepository.delete(id);
    }
    findByUsername(username:string):Promise<User>{
        return this.userRepository.findOneBy({username})
    }
    findByToken(id:number):Promise<User>{
        return this.userRepository.findOneBy({id})
    }
};