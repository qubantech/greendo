import {useWatchedObject} from "../app.realtimedb.service";
import {Takeout} from "../../app.models/models";

export function useTakeout(takeoutId: number) {
    return useWatchedObject<Takeout>(`/takeouts/${takeoutId}`)
}

export function useTakeoutList() {
    return useWatchedObject<Array<Takeout | null>>(`/takeouts`)
}
