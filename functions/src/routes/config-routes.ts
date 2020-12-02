import { Application } from "express";
import { config ,logs} from "../controller/config/config";
// import { isAuthenticated } from "../controller/auth/authenticated";
// import { isAuthorized } from "../controller/auth/authorized";

export default function routesConfig(app: Application) {
    app.post('/logs', [        
        // isAuthenticated,
        // isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
        logs,
    ]
    );
    app.post('/config', [
        //isAuthenticated,
        config,
    ]
    );
}
