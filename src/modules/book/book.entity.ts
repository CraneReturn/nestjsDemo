import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity('book')
export class Book{
    @PrimaryGeneratedColumn()
    id:number;
    
    // @Column()
    // path:string;

    @Column()
    @Unique(['name'])
    name:string;

    @Column()
    @Unique(['filename'])
    filename:string;

    // @Column()
    // redirect:string;

    @Column()
    cover:string;

    @Column()
    title:string;

    @Column()
    author:string;

    @Column()
    pubulisher:string;

    @Column()
    bookId:string;

    @Column()
    category:number;

    // @Column()
    // language:number;

    // @Column()
    // rootFile:string;
}