import {User} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useUser(userId: string) {
    return useWatchedObject<User>(`/users/${userId}`)
}

export function useUserList() {
    return useWatchedObject<Array<User | null>>(`/users`)
}
