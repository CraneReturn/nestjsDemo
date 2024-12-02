import { Client } from "minio";
export const minioClient = new Client({
    endPoint: "ip",
    port: 9001, //端口号，又就传没有就不传
    useSSL: false,
    accessKey: 'key',
    secretKey: 'password',
})