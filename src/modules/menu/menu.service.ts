import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menu } from "./menu.entity";
import { Repository } from "typeorm";
@Injectable()
export class MenuService {
    //用于注入typeorm的仓库 Repository是typeorm提供的仓库类 用于与数据库进行交互
    constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {

    }
    //单个查询
    findOne(id: number): Promise<Menu> {
        return this.menuRepository.findOneBy({ id });
    }
    findAll(): Promise<Menu[]> {
        return this.menuRepository.find();
    }
    //根据active查询
    findMenu(active: number) {
        return this.menuRepository.findBy({ active })
    }
    //获取带有子菜单的菜单
    async getMenuWithChildren() {
        //获取所有的菜单
        const menus = await this.menuRepository.find();
        console.log(menus,'1141');
        
        const menuMaps = new Map <number,Menu>();
        menus.forEach(menu => 
        {
            menu.children = [];
            menuMaps.set(menu.id,menu)
        }    
        );
        const result:Menu[] = [];
        menus.forEach(menu => {
            if(menu.pid===null){
                result.push(menu);
            }
            else{
                const parentMenu = menuMaps.get(menu.pid);
                if(parentMenu){
                    parentMenu.children.push(menu);
                }
            }
        });
        
        console.log(result);
        
        return result
    }
};