import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
        {
            return wrapperResponse(
                this.menuService.getMenuWithChildren(),
                '获取嵌套菜单成功'
            );
        }
    }
    @Get('status/:status')
    findStatus(@Param() params)
    {
        return wrapperResponse(
            this.menuService.findMenu(params.status),
            '获取菜单成功'
        );
    }
    @Post('add')
    add(@Body() body:Menu) {
        return wrapperResponse(
            this.menuService.addnewMenu(body),
            '添加菜单成功'
        );
    }
    @Put('update')
    update(@Body() body:Menu) {
        return wrapperResponse(
            this.menuService.updateMenu(body),
            '更新菜单成功'
        );
    }
}
