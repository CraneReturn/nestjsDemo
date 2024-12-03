// import { FileEntity } from "src/modules/file/file.entity";
// import { User } from "src/modules/user/user.entity";
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

// @Entity('likefile')
// export class LikeFile {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     @Unique(['userId'])
//     userId: number;

//     @ManyToOne(() => User, user => user.likes)
//     user: User;

//     @Column()
//     @Unique(['fileId'])
//     fileId: number;

//     @Column()
//     isLike: number; //1是喜欢，0是不喜欢

//     @ManyToOne(() => FileEntity, file => file.belikes)
//     file: FileEntity;

// }
import { FileEntity } from "src/modules/file/file.entity";
import { User } from "src/modules/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('likefile')
@Unique(['userId', 'fileId']) // 组合唯一约束
export class LikeFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @Column()
    fileId: number;

    @ManyToOne(() => FileEntity, file => file.belikes)
    file: FileEntity;

    @Column()
    isLike: number; // 1是喜欢，0是不喜欢
}
