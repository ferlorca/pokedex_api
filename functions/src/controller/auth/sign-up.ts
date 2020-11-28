import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";
import axios from "axios";
import config from "./../../config";
import {grantUserRole} from "./authenticated";

export async function signup(req: Request, res: Response) {
    try {
        if (!req.body.email)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });
        if (!req.body.password)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });
        const { data } = await axios.post(config.URL_SING_UP, req.body);
        await grantUserRole(req.body.email);

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        return res.status(200).send({ expirationDate, token: data.idToken, userId: data.localId , role: "user" });
    } catch (err) {
        return handleError(res, err);
    }
}

