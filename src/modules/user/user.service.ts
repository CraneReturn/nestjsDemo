import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { DeleteResult, Like, Repository } from "typeorm";
import { CreateUserDto } from "./create-user-dto";
import { FileEntity } from "../file/file.entity";
import { LikeFile } from "../like/like.entity";
import { LikeService } from "../like/like.service";

@Injectable()
export class UserService {
    //用于注入typeorm的仓库 Repository是typeorm提供的仓库类 用于与数据库进行交互
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly likeService: LikeService,
    ) {

    }
    //查询点赞过的文件
    async getLikedFiles(userId: number) {
        //查询user 如果不存在返回

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['likes'], // 加载关联的likes关系
        });


        if (!user) {
            throw new Error('用户不存在');
        }
        //查询用户的点赞记录
        const likedFiles = await user.likes.map(async like => ({
            likeId: like.id,
            likeFile: await this.likeService.getLikeCount(like.fileId),
        }));
        return Promise.all(likedFiles);


    }
    //单个查询
    findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    addUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.active = 1;
        user.role = createUserDto.role;
        user.avatar = createUserDto.avatar;
        user.nickname = createUserDto.nickname;
        return this.userRepository.save(user);
    }
    deleteUser(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
    findByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({ username })
    }
    findByToken(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }
};