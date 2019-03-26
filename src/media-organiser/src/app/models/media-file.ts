import { Category } from './category';
import { Playlist } from './playlist';
import { Image } from './image';
import * as uuidv1 from 'uuid';



export class MediaFile {
    id: string;
    name: string;
    path: string;
    type: string;
    comment?: string;
    categories?: Category[] = [];
    playlists?: Playlist[] = [];
    image: Image;

    constructor(path: string) {
        this.id = uuidv1();
        const pathArray = path.split('\\');
        this.name = pathArray[pathArray.length - 1].split('.')[0];
        this.type = pathArray[pathArray.length - 1].split('.')[1];
        this.path = path;
        this.categories = [];
        this.playlists = [];
    }

    setComment(comment: string) {
        this.comment = comment;
    }
}
