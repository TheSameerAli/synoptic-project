import { Category } from './category';
import { Playlist } from './playlist';
import { Image } from './image';

export class MediaFile {
    name: string;
    path: string;
    type: string;
    comment?: string;
    categories?: Category[];
    playlists?: Playlist[];
    image: Image;

    constructor(path: string) {
        const pathArray = path.split('\\');
        this.name = pathArray[pathArray.length - 1].split('.')[0];
        this.type = pathArray[pathArray.length - 1].split('.')[1];
        this.path = path;
    }
}
