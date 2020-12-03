import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import * as admin from 'firebase-admin';
import {Pokemon,Base} from "./../../models/Pokemon";
import {User} from "./../../models/User";


const COLLECTION_POKEDEX="pokedex";
const COLLECTION_POKEMON="pokemons";

export async function all(req: Request, res: Response) {
	try {        
        const {uid} = res.locals;
        const pokedexSnapshot =  await admin.firestore()
        .collection("user")
        .doc(uid)
        .collection(COLLECTION_POKEDEX)
        .get();
        let pokedex:Array<Pokemon> =[];
        if(pokedexSnapshot.size > 0){
            pokedex =  pokedexSnapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>Pokemon.fromFirebaseDocument(item));

            for (const pokemon of pokedex) {
                const baseSnapshot = await admin.firestore().collection(`${COLLECTION_POKEMON}/${pokemon.id}/base`).get();
                pokemon.addBase(Base.fromFirebaseDocument(baseSnapshot.docs[0]))
            }       
        }

		return res.status(200).send({pokedex})
       
	} catch (err) {
		return handleError(res, err)
	}
}

export async function getUser(req: Request, res: Response) {
	try {        
        const {email,role} = res.locals;
        const user = new User(email,role[0]);
		return res.status(200).send(user.toJson())
       
	} catch (err) {
		return handleError(res, err)
	}
}


export async function add(req: Request, res: Response) {
	try {        
        const {uid} = res.locals;
        const {pokeId} = req.body;
        const myPokemonssnapshot = await admin.firestore()
        .collection("user")
        .doc(uid)
        .collection(COLLECTION_POKEDEX).get();
        if(myPokemonssnapshot.size >= 5)
            return handleError(res, new Error("You can not add a new pokemon to the list"))

        const pokeSnapshot = await admin.firestore().collection(`${COLLECTION_POKEMON}`).doc(pokeId).get();
        const pokemon:Pokemon = Pokemon.fromFirebaseDocument(pokeSnapshot) ;            
     
        const baseSnapshot = await admin.firestore().collection(`${COLLECTION_POKEMON}/${pokeId}/base`).get();
        pokemon.addBase(Base.fromFirebaseDocument(baseSnapshot.docs[0]))
        
        
        await admin.firestore()
        .collection("user")
        .doc(uid)
        .collection(COLLECTION_POKEDEX)
        .doc(pokemon.id)
        .create(pokemon.toJson());    

		return res.status(200).send({pokemon})
       
	} catch (err) {
		return handleError(res, err)
	}
}


export async function remove(req: Request, res: Response) {
	try {        
        const {uid} = res.locals;
        const {pokeId} = req.body;
        await admin.firestore()
        .collection("user")
        .doc(uid)
        .collection(COLLECTION_POKEDEX)
        .doc(pokeId)
        .delete()     

		return res.status(204).send({})
       
	} catch (err) {
		return handleError(res, err)
	}
}
