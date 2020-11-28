import { Application } from "express";
import signin from "../controller/auth/sign-in";
import { signup } from "../controller/auth/sign-up";
import { isAuthenticated  } from "../controller/auth/authenticated";
import {role}  from "../controller/auth/role";



export default function routesConfig(app: Application) {
   app.post('/signin',
      signin
   );
   app.post('/signup',
      signup
   );
   app.get('/role',
      [
      isAuthenticated,    
      role  
      ]
   );
}