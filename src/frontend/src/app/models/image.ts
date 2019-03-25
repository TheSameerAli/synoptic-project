import * as uuidv1 from 'uuid';


export class Image {
    id: string;
    name: string;
    path: string;

    constructor(name: string, path: string) {
        this.id = uuidv1();
        this.name = name;
        this.path = path;
    }
}
