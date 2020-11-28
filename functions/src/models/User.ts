export default class UserAuth {
    public id: string;
    public name: string;
    public email: string;
    public image: string;

    constructor(id: string,email: string, name: string, image: string)
     {
        this.id = id;
        this.email = email;
        this.name = name;
        this.image = image ;  
    }
   

    static fromData(data: FirebaseFirestore.DocumentData): User {
        const id = data.id;
        const name =  data.data().name;
        const image =  data.data().image;
        const email =  data.data().email;
        return new this(id,email,name,image);
    } 
}

