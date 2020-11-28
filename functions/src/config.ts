import GeneralConfiguration from "./pokedex";

const URL_LOGIN:string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GeneralConfiguration.firebaseConfig.apiKey}`;
const URL_SING_UP:string =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${GeneralConfiguration.firebaseConfig.apiKey}`;

export default {    
    URL_LOGIN,
    URL_SING_UP,
    serviceAccount: GeneralConfiguration.adminKey
} 