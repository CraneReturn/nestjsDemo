import { LikeFile } from "src/modules/like/like.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
//数据库的定义
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @Unique(['username'])
    username: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @Column()
    nickname: string;
    @Column()
    active: number;
    @Column()
    avatar: string;

    @OneToMany(() => LikeFile, like => like.user)
    likes: LikeFile[]; // 反向关系
}
