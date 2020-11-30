import { AxiosError } from "axios";

export class Error {
    message:string;
    code:string;
    createDate:Date;
    stacktrace:string;

    constructor(message:string,code:string,createDate:Date,stacktrace:string) {
        this.message= message;
        this.code=code;
        this.createDate=createDate;
        this.stacktrace=stacktrace ?? "";
    }

    static fromObject(data: any): Error {   
        if(data.isAxiosError)
            return Error.getAxiosNewError(data);        
        return new this(data.message,data.code,data.createDate ?? new Date(),data.stacktrace ?? data.stack);
    }  

    static getAxiosNewError(data:AxiosError): Error {
        return new this(
            data.message + "  //  "+ data.response?.data?.error?.message,
            data.response ? data.response.status.toString() : "500",
            new Date(data.response?.headers?.date),
            data.stack ? data.stack : ""); 
    }
}