import {useWatchedObject} from "../app.realtimedb.service";
import {Fundomate} from "../../app.models/models";

export function useFundomate(fundomateId: number) {
    return useWatchedObject<Fundomate>(`/fundomates/${fundomateId}`)
}

export function useFundomateList() {
    return useWatchedObject<Array<Fundomate | null>>(`/fundomates`)
}
