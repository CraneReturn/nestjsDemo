//响应体dto
import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE, RESPONSE_MSG } from 'src/enums';
export class ResponseDto {
    @ApiProperty({
        type: Number,
        description: '状态码',
        default: RESPONSE_CODE.SUCCESS,
    })
    code: number;
    @ApiProperty({
        type: String,
        description: '响应信息',
        default: RESPONSE_MSG.SUCCESS,
    })
    msg: string;
    @ApiProperty({
        description: '响应数据',
    })
    data?: any;

    @ApiProperty({ type: Number, description: '时间戳', default: 1720685424078 })
    timestamp: number;
}