import {useWatchedObject} from "../app.realtimedb.service";
import {Container} from "../../app.models/models";

export function useContainer(containerId: number) {
    return useWatchedObject<Container>(`/containers/${containerId}`)
}

export function useContainerList() {
    return useWatchedObject<Array<Container | null>>(`/containers`)
}
