export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};


type DataStoreMethods = {
  [K in keyof DataEntityMap as `GetAll${Capitalize<K>}s`]: () => DataEntityMap[K][]
} & {
  [K in keyof DataEntityMap as `Get${Capitalize<K>}ById`]: (id: string) => DataEntityMap[K]
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (entity: DataEntityMap[K]) => DataEntityMap[K]
}



export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {}
  }

  getAllSongs(): Song[] {
    return Object.values(this.#data.song).map((songKey) => this.#data.song[songKey]);
  }
  getSong(id: string): Song {}
  clearSongs(): void {}
  addSong(entity: Song): Song {}

  getAllMovies(): Movie[] {
    return Object.values(this.#data.movie);
  }
  getMovie(id: string): Movie {
    return this.#data.movie[id];
  }
  clearMovies(): void {}
  addMovie(entity: Movie): Movie {
    this.#data.movie[entity.id] = entity;
    return entity;
  }




}


const ds: DataStoreMethods = { } as any;


