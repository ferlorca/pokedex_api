
export class Type{
    name: string;
    id: string;  

    constructor(id:string,name:string) {
        this.name= name;        
        this.id = id;             
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Type {
        const id = data.id;
        const name =  data.data().name;  
        return new this(id,name);
    }

    static fromData(data:any): Type {
        const id = data.id;       
        const name= data.name; 
        return new this(id ,name);
    }   
}
