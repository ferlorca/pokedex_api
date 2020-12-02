import { Application } from "express";
import { all, get,types } from "../controller/pokemon/pokemon";
import { isAuthenticated } from "../controller/auth/authenticated";
import { isAuthorized } from "../controller/auth/authorized";

export default function routesConfig(app: Application) {
    app.post('/pokemon/all', [
        //isAuthenticated,
        all,
    ]
    );  
    app.post('/pokemon/types', [
        //isAuthenticated,
        types,
    ]
    ); 
    app.post('/pokemon/get',
        [
            isAuthenticated,
            isAuthorized({ hasRole: ['admin', 'user'], allowSameUser: true }),
            get,
        ]
    );
}