import { Genre } from "./genre";
import { Mechanic } from "./mechanic";

export interface Game {
    id: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime: number;
    minPlayingTime: number | null; 
    maxPlayingTime: number | null;
    thumbnail: string;
    bgg_id: number;
    bgg_name: string;
    age: number;
    genres: Genre[];
    mechanics: Mechanic[];
    year: number;
}
