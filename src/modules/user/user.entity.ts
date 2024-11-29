import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
