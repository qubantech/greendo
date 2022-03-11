import {useWatchedObject} from "../app.realtimedb.service";
import {TrashType} from "../../app.models/models";

export function useTrashType(trashTypeId: number) {
    return useWatchedObject<TrashType>(`/types/${trashTypeId}`)
}

export function useTrashTypeList() {
    return useWatchedObject<Array<TrashType | null>>(`/types`)
}
