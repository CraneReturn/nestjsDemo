import { Client } from "minio";
import * as dotenv from 'dotenv';
dotenv.config();
export const minioClient = new Client({
    endPoint: process.env.MINIO_IP,
    port:Number(process.env.MINIO_PORT), //端口号，又就传没有就不传
    useSSL: false,//https设置为true
    accessKey:process.env.MINIO_ACCESSKEY,
    secretKey:process.env.MINIO_SECRET_KEY,
})