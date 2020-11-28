import { Response } from "express";
import * as admin from 'firebase-admin';
import {Error} from "./../../models/Error"

export function handleError(res: Response, err: any) {
    let error =  Error.fromObject({message:err.message,code:err.code,createDate:new Date()})
    admin.firestore().collection("logs").add(error);
    return res.status(500).send({ message: `An error occurred :(. \n  We will try to solve it as quickly as possible.. ` });
}