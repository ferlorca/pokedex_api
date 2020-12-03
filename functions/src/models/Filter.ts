export class Filter {
    page:number;
    amountPerPage:number;
    type?: Array<string>;
    name?: Name;
    attack?: Between;
    defense?: Between;
    hp?: Between;
    spAttack?: Between;
    spDefense?: Between;
    speed?: Between;    

    public constructor(page:number,
        amountPerPage:number,
        type?: Array<string>,
        name?:Name,
        attack?: Between,
        defense?: Between,
        hp?: Between,
        spAttack?: Between,
        spDefense?: Between,
        speed?: Between) {
        this.page = page;
        this.amountPerPage = amountPerPage;
        this.type = type;
        this.name  = name;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
    }

    static fromData(data: any): Filter {
        const page = data.page ? data.page - 1 :  0;
        const amountPerPage = data.amountPerPage ?? 100;
        const type = data.type && data.type.length>0 ?data.type : undefined;
        const name =data.name ? new Name(data.name.text, data.name.language)  :undefined;
        const attack = Filter.isCorrectValue(data.attack) ? new Between(data.attack.min, data.attack.max) : undefined;
        const defense = Filter.isCorrectValue(data.defense) ? new Between(data.defense.min, data.defense.max): undefined;
        const hp = Filter.isCorrectValue(data.hp) ? new Between(data.hp.min, data.hp.max): undefined;
        const spAttack = Filter.isCorrectValue(data.spAttack) ? new Between(data.spAttack.min, data.spAttack.max): undefined;
        const spDefense = Filter.isCorrectValue(data.spDefense) ? new Between(data.spDefense.min, data.spDefense.max): undefined;
        const speed = Filter.isCorrectValue(data.speed) ? new Between(data.speed.min, data.speed.max): undefined;

        return new this(
            page,
            amountPerPage,
            type,
            name,
            attack,
            defense,
            hp,
            spAttack,
            spDefense,
            speed,
        );
    }

    static isCorrectValue(data:any):Boolean{
        if(data && data.min !== undefined && typeof data.min === "number" && data.min >= 0  &&
           data.max !== undefined && typeof data.max === "number"  &&
           data.max >= data.min
        )
            return true;
        return false;
    }
}


export class Between {
    min: number;
    max: number;
    public constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}

export class Name {
    text: string;
    language: string;
    public constructor(text: string, language: string) {
        this.text = text;
        this.language = language;
    }
}