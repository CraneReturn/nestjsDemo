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
export function wrapperResponse(p,msg){
    return p.then((data)=>{
        return successMethods(data,msg)
    }).catch((error)=>{
        return errorMethods(error.msg)})   
}