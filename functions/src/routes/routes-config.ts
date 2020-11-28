import { Application } from "express";
import userRoutes  from './user-routes';
import authRoutes  from './auth-routes';

export function routesConfig(app: Application) {
    userRoutes(app);
    authRoutes(app);
}