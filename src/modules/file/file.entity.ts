import { LikeFile } from "src/modules/like/like.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//文件表 后续弄远程url
@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalname: string

    @Column()
    mimetype: string

    @Column()
    size: number

    @Column({ type: 'varchar', length: 500 })
    path: string


    @OneToMany(() => LikeFile, like => like.file)
    belikes: LikeFile[]; // 反向关系
}