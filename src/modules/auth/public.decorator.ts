import { SetMetadata } from "@nestjs/common";

//标识公共接口
export const IS_PUBLIC_KEY = 'isPublic';
export const Public=()=>SetMetadata(IS_PUBLIC_KEY,true);