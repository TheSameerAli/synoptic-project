import * as uuidv1 from 'uuid';

export class Category {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = uuidv1();
        this.name = name;
    }
}
