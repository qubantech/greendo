import {useWatchedObject} from "../app.realtimedb.service";
import {Code} from "../../app.models/models";

export function useCode(barCode: string) {
    return useWatchedObject<Code>(`/codes/${barCode}`)
}

export function useCodeList() {
    return useWatchedObject<Array<Code | null>>(`/codes`)
}
