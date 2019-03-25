import * as uuidv1 from 'uuid';

export class Playlist {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = uuidv1();
        this.name = name;
    }
}
