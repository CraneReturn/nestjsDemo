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