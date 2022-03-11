import {Fundomate, Giveaway, GiveawayTicket, Sale, Subscription, Takeout, User} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useUser(userId: number) {
    return useWatchedObject<User>(`/users/${userId}`)
}

export function useUserList() {
    return useWatchedObject<Array<User | null>>(`/users`)
}

export function useTakeout(takeoutId: number) {
    return useWatchedObject<Takeout>(`/takeouts/${takeoutId}`)
}

export function useTakeoutList() {
    return useWatchedObject<Array<Takeout | null>>(`/takeouts`)
}

export function useFundomate(fundomateId: number) {
    return useWatchedObject<Fundomate>(`/fundomates/${fundomateId}`)
}

export function useFundomateList() {
    return useWatchedObject<Array<Fundomate | null>>(`/fundomates`)
}

export function useSale(saleId: number) {
    return useWatchedObject<Sale>(`/sales/${saleId}`)
}

export function useSaleList() {
    return useWatchedObject<Array<Sale | null>>(`/sales`)
}

export function useSubscription(subscriptionId: number) {
    return useWatchedObject<Sale>(`/subscriptions/${subscriptionId}`)
}

export function useSubscriptionList() {
    return useWatchedObject<Array<Subscription | null>>(`/subscriptions`)
}

export function useGiveaway(giveawayId: number) {
    return useWatchedObject<Giveaway>(`/giveaways/${giveawayId}`)
}

export function useGiveawayList() {
    return useWatchedObject<Array<Giveaway | null>>(`/giveaways`)
}
