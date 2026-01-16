// import { Response } from "express";

// const sendResponse = <T>(
//   res: Response,
//   jsonData: {
//     statusCode: number;
//     success: boolean;
//     message: string;
//     meta?: {
//       page: number;
//       limit: number;
//       total: number;
//     };
//     data: T | null | undefined;
//   }
// ) => {
//   res.status(jsonData.statusCode).json({
//     success: jsonData.success,
//     message: jsonData.message,
//     meta: jsonData.meta || null || undefined,
//     data: jsonData.data || null || undefined,
//   });
// };

// export default sendResponse;

import { Response } from "express";

interface TMeta {
    total:number;
}
interface TResponse<T> {
    statusCode:number;
    success:boolean;
    message:string;
    data: T,
    meta?:TMeta
}
const sendResponse = <T>(res:Response,data:TResponse<T>)=>{
    res.status(data.statusCode).json({
        statusCode : data.statusCode,
        success : data.success,
        message: data.message,
        meta:data.meta,
        data: data.data,
    })
}

export default sendResponse
