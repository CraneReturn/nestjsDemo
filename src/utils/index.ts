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
