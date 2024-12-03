declare namespace Api {
    namespace Common {
        type Response<T = any> = {
            code: number,
            message: string,
            data: T
        }
        type PageResponse<T = any> = {
            current?: number;
            size?: number; 
            total?: number;
            records: T[];
        };
    }
}