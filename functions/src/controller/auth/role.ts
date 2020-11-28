import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";
import * as admin from 'firebase-admin';

export async function role(req: Request, res: Response) {
    try {
        return res.status(200).send({ role: res.locals.role });
    } catch (err) {
        return handleError(res, err);
    }
}

export async function getRoles(req: Request, res: Response) {
    try {
        const snapshot = await admin.firestore().collection("roles").get();
        const roles =  snapshot.docs.map((item)=>item.data());
        return res.status(200).send({ roles });
    } catch (err) {
        return handleError(res, err);
    }
}



