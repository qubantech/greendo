import {useWatchedObject} from "../app.realtimedb.service";
import {Giveaway} from "../../app.models/models";

export function useGiveaway(giveawayId: number) {
    return useWatchedObject<Giveaway>(`/giveaways/${giveawayId}`)
}

export function useGiveawayList() {
    return useWatchedObject<Array<Giveaway | null>>(`/giveaways`)
}
