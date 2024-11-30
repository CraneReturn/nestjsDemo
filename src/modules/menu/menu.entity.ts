import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity('menu')
export class Menu{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    @Unique(['path'])
    path:string
    
    @Column()
    @Unique(['name'])
    name:string

    @Column()
    meta:string

    @Column({ nullable: true }) 
    pid: number | null;
    //1可用 0不可用

    @Column()
    redirect:string
    
    @Column({default:1})
    active:number
    //表示存在一个实体存在和其他实体相关联 一个Menu可以有多个子菜单
    @OneToMany(()=>Menu,(menu)=>menu.pid)
    children:Menu[]
}