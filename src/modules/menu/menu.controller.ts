import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils';
import { Menu } from './menu.entity';

@Controller('menu')
export class MenuController {
    constructor(private menuService:MenuService){}
    @Get('find')
    find() {
        return this.menuService.findAll();
    }
    @Get('/children')
    async getMenus(): Promise<Menu[]> {
        return this.menuService.getMenuWithChildren();
    }
    @Get('status/:status')
    findStatus(@Param() params)
    {
        return wrapperResponse(
            this.menuService.findMenu(params.status),
            '获取菜单成功'
        );
    }
}
