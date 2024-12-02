import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//文件表 后续弄远程url
@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    originalname :string
    
    @Column()
    mimetype:string

    @Column()
    size:number
   
    @Column({ type: 'varchar', length: 500 })
    path:string


}