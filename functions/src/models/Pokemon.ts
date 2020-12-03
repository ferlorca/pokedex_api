
export class Pokemon {
    name: NameTranslations;
    type: Array<string>;
    id: string;
    base?: Base;

    constructor(id: string, name: NameTranslations, type: Array<string>) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.base = undefined;
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Pokemon {
        const id = data.id;
        const pokemon = data.data();
        const name = new NameTranslations(pokemon.name.chinese, pokemon.name.french, pokemon.name.english, pokemon.name.japanese);
        const type = [...pokemon.type];
        return new this(id, name, type);
    }

    static fromData(data: any): Pokemon {
        const id = data.id;
        const name = new NameTranslations(data.name.chinese, data.name.french, data.name.english, data.name.japanese);
        const type = [...data.type];
        return new this(id, name, type);
    }

    addBase(base: Base) {
        this.base = base;
    }
    
    public toJson(): any {
        return {
            name: this.name.toJson(),
            type: this.type,
            id: this.id,
            base: this.base?.toJson(),
        }
    }
}

class NameTranslations {
    chinese: string;
    french: string;
    english: string;
    japanese: string;
    constructor(chinese: string, french: string, english: string, japanese: string) {
        this.chinese = chinese;
        this.french = french;
        this.english = english;
        this.japanese = japanese;
    }

    public toJson(): any {
        return {
            chinese: this.chinese,
            french: this.french,
            english: this.english,
            japanese: this.japanese,
        }
    }
}

export class Base {
    id: string;
    attack: number;
    defense: number;
    hp: number;
    spAttack: number;
    spDefense: number;
    speed: number;

    public constructor(id: string,
        attack: number,
        defense: number,
        hp: number,
        spAttack: number,
        spDefense: number,
        speed: number) {
        this.id = id;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
    }

    public toJson(): any {
        return {
            id: this.id,
            attack: this.attack,
            defense: this.defense,
            hp: this.hp,
            spAttack: this.spAttack,
            spDefense: this.spDefense,
            speed: this.speed,
        }
    }

    static fromData(data: any): Base {
        return new this(data.id,
            data.attack,
            data.defense,
            data.hp,
            data.spAttack,
            data.spDefense,
            data.speed);
    }

    static fromFirebaseDocument(data: FirebaseFirestore.DocumentData): Base {
        const id = data.id;
        const base = data.data();
        return new this(id,
            base.Attack,
            base.Defense,
            base.HP,
            base["Sp. Attack"],
            base["Sp. Defense"],
            base.Speed);
    }
}




