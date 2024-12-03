import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { LikeService } from './like.service';
import { returnResponse } from 'src/utils';
import { throwError } from 'rxjs';
import { query } from 'express';

@Controller('like')
export class LikeController {
    constructor(private likeService: LikeService) { }
    //点赞或者取消点赞
    @Post('/like')
    async likeFile(@Body() body, @Req() req, @Res() res: Response) {

        const uid = req.user.userid
        console.log(uid);
        const { fileId } = body;

        const data = await this.likeService.likeFile(fileId, uid);
        return returnResponse(data, res)

    }
    @Get('/count')
    async getLikeCount(@Query() query, @Res() res: Response) {
        const fileId = query.fileId;
        
        const data = await this.likeService.getLikeCount(fileId);
        return returnResponse(data, res)
    }
}
