import { Application } from "express";
import authRoutes  from './auth-routes';
import pokemonRoutes  from './pokemon-routes';
import configRoutes  from './config-routes';

export function routesConfig(app: Application) {
    authRoutes(app);
    pokemonRoutes(app);
    configRoutes(app);
}