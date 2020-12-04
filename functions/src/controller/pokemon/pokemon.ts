import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import * as admin from 'firebase-admin';
import {Pokemon,Base} from "./../../models/Pokemon";
import {Filter/*,Between*/} from "./../../models/Filter";
import { Type } from "../../models/Type";


const COLLECTION_POKEMON="pokemons";
const COLLECTION_TYPES="types";

export async function all(req: Request, res: Response) {
	try {        
        const filter = Filter.fromData(req.body.filter);   
        const snapshot = await getSnapshotReference(filter);
        // const totalpages = Math.ceil(snapshot.size/filter.amountPerPage);  
        const pokemons:Array<Pokemon> =  snapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>Pokemon.fromFirebaseDocument(item));
		if(!filter.type)
			filter.type=[];
		filter.page += 1 ;
		return res.status(200).send({pokemons,filter})
       
	} catch (err) {
		return handleError(res, err)
	}
}

async function getSnapshotReference(filter:Filter): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>{
    
    let query:FirebaseFirestore.Query = admin.firestore().collection(COLLECTION_POKEMON);
    const nameLang = filter.name ? filter.name?.language : "english";
	query = query.orderBy(`name.${nameLang}`);
	
    if(filter.type)
		query = query.where("type", "array-contains-any", filter.type);
	
	if(filter.name && filter.name.text)
		query = query.where(`name.${filter.name.language}`, '>=', filter.name.text);	

	if(filter.amountPerPage !== -1){
		const startAt =  filter.page !== 0 ? (filter.page * filter.amountPerPage ) : filter.page;
		query = query.startAt(startAt).limit(filter.amountPerPage);
	}	 

	
    
    return query.get();    
}


export async function types(req: Request, res: Response) {
	try {
        const snapshot  = await admin.firestore().collection(COLLECTION_TYPES).orderBy("name","asc").get();  
        const allTypes:Array<Type> = snapshot.docs.map(item=> Type.fromFirebaseDocument(item));
        return res.status(200).send({types:allTypes});
	} catch (err) {
		return handleError(res, err)
	}
}

export async function get(req: Request, res: Response) {
	try {
		const { id } = req.body;
		const doc = await admin.firestore().collection(COLLECTION_POKEMON).doc(id).get();
		let pokemon:Pokemon;
		if (doc.exists) {
			pokemon = Pokemon.fromFirebaseDocument(doc);
			const prodSnapshot = await admin.firestore().collection(`${COLLECTION_POKEMON}/${id}/base`).get();
			pokemon.addBase(Base.fromFirebaseDocument(prodSnapshot.docs[0]))			
			return res.status(200).send({pokemon})
		} else {
			return handleError(res, "No such document!")
		}
	} catch (err) {
		return handleError(res, err)
	}
}
