import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeFile } from './like.entity';
import { User } from 'src/modules/user/user.entity';
import { FileEntity } from 'src/modules/file/file.entity';
@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(LikeFile)
        private readonly likeEntity: Repository<LikeFile>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(FileEntity)
        private readonly fileidRepository: Repository<FileEntity>,
    ) {

    }
    async likeFile(fileid, uid) {
        if (!uid || !fileid) {
            throw new HttpException('参数不能为空', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOneBy({ id: uid });


        if (!user) {
            throw new Error('用户不存在');
        }
        const file = await this.fileidRepository.findOneBy({ id: fileid });
        if (!file) {
            throw new Error('文件不存在');
        }
        //先去数据查找
        const likeid = await this.likeEntity.findOne({
            where: {
                userId: uid,
                fileId: fileid
            }
        })

        if (likeid) {
            //点过赞了 取消点赞
            try {
                return await this.likeEntity.delete(likeid.id)
            } catch (e) {
                throw new HttpException('取消点赞失败', HttpStatus.BAD_REQUEST)
            }
        } else {
            //没点过赞 点赞
            const like = new LikeFile();
            like.fileId = fileid;
            like.userId = uid;
            like.isLike = 1;
            try {
                return await this.likeEntity.save(like)
            } catch (e) {
                console.log(e);

                throw new HttpException('点赞失败', HttpStatus.BAD_REQUEST)
            }
        }

    }
    //通过id查询点赞数量并返回user信息
    async getLikeCount(id: number) {
        const count = await this.likeEntity.count({
            where: {
                fileId: id,
                isLike: 1
            }
        })
        const likes = await this.likeEntity.find({
            where: {
                fileId: id,
                isLike: 1
            },
            relations: ['user']
        })
        // 提取用户信息
        const users = likes.map(like => ({
            username: like.user.username,
            avatar: like.user.avatar,
        }));

        return {
            count,
            users
        }
    }
    
}
