import { Application } from "express";
import { all, add, remove, getUser } from "../controller/pokedex/pokedex";
import { isAuthenticated } from "../controller/auth/authenticated";
import { isAuthorized } from "../controller/auth/authorized";

export default function routesConfig(app: Application) {
    app.post('/pokedex/all',
        [
            isAuthenticated,
            isAuthorized({ hasRole: ['admin', 'user'] }),
            all,
        ]
    );
    app.post('/pokedex/add',
        [
            isAuthenticated,
            isAuthorized({ hasRole: ['admin', 'user'] }),
            add,
        ]
    );
    app.post('/pokedex/remove',
        [
            isAuthenticated,
            isAuthorized({ hasRole: ['admin', 'user'] }),
            remove,
        ]
    );
    app.post('/pokedex/getUser',
        [
            isAuthenticated,
            isAuthorized({ hasRole: ['admin', 'user'] }),
            getUser,
        ]
    );
}