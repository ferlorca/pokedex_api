// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './routes/routes-config';

import config from "./config";

admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: "https://pokedex-79f41.firebaseio.com"
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
routesConfig(app);

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})

// export const api = functions.https.onRequest(app);
