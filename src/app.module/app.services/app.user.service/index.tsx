import {Fundomate, Giveaway, GiveawayTicket, Sale, Subscription, Takeout, User} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useUser(userId: number) {
    return useWatchedObject<User>(`/users/${userId}`)
}

export function useUserList() {
    return useWatchedObject<Array<User | null>>(`/users`)
}
