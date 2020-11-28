import { Application } from "express";
import authRoutes  from './auth-routes';

export function routesConfig(app: Application) {
    authRoutes(app);
}