import * as uuidv1 from 'uuid';
import { PlaylistMediaFile } from './playlist-media-file';

export class Playlist {
    id: string;
    name: string;
    mediaFiles: PlaylistMediaFile[];

    constructor(name: string) {
        this.id = uuidv1();
        this.name = name;
        this.mediaFiles = [];
    }
}
