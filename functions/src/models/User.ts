import { Pokemon } from "./Pokemon";


export class User{
    name: string;
    email: string;
    role: string;
    maxPokemon: number = 5;
    pokemons:Array<Pokemon>;

    constructor(name:string,email:string,role:string) {
        this.name= name;
        this.email=email;
        this.role=role;  
        this.pokemons=[];     
    }

    addPokemon(newPokemon: Pokemon) {
        this.pokemons.push(newPokemon);
    }
}