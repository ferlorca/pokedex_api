import { Response } from "express";

export function handleError(res: Response, err: any) {
    //save into firestore the complete log
    console.log(`${err.code} - ${err.message}`);
    return res.status(500).send({ message: `An error occurred :(. \n  We will try to solve it as quickly as possible.. ` });
}