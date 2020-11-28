export class Error {
    message:string;
    code:string;
    createDate:Date;

    constructor(message:string,code:string,createDate:Date) {
        this.message= message;
        this.code=code;
        this.createDate=createDate;
    }

    static fromObject(data: any): Error {     
        let message= data.message;
        let code=data.code;
        let createDate=data.createDate;  
        return new this(message,code,createDate);
    }   
}