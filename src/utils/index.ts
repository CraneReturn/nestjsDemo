import * as dayjs from 'dayjs';
import { ResponseDto } from 'src/dto/response.dto';
import { RESPONSE_CODE, RESPONSE_MSG } from "src/enums"

export function successMethods(data, msg) {
    return {
        code: 0,
        data,
        msg
    }
};
export function errorMethods(msg) {
    return {
        code: -1,
        msg
    }
};
export function wrapperResponse(p, msg) {
    return p.then((data) => {
        return successMethods(data, msg)
    }).catch((error) => {
        return errorMethods(error.sqlMessage)
    })
}
// 封装分页数据
export function successCountMethods(data, count, msg) {
    return {
        code: 0,
        data,
        msg,
        count
    }
};
export function wrapperCountResponse(dataPromise, countPromise, msg) {
    return Promise.all([dataPromise, countPromise]).then(([data, countData]) => {
        const [count] = countData
        return successCountMethods(
            data,
            count.count,
            msg)
    }).catch((error) => {
        return errorMethods(error.sqlMessage)
    })
}
//新的统一返回的方法
export interface Response<T> {
    data: T;
    msg: string;
    code: number;
    timestamp: number;
}
export const responseMessage = <T = any>(
    data,
    msg: string = RESPONSE_MSG.SUCCESS,
    code: number = RESPONSE_CODE.SUCCESS
): Response<T> => ({
    data,
    msg,
    code,
    timestamp: dayjs().valueOf()
})
export const returnResponse = (result, res) => {
    const response: ResponseDto = responseMessage(result);
    return res.status(RESPONSE_CODE.SUCCESS).json(response);
}