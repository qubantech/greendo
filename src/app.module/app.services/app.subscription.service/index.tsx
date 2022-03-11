import {useWatchedObject} from "../app.realtimedb.service";
import {Sale, Subscription} from "../../app.models/models";

export function useSubscription(subscriptionId: number) {
    return useWatchedObject<Sale>(`/subscriptions/${subscriptionId}`)
}

export function useSubscriptionList() {
    return useWatchedObject<Array<Subscription | null>>(`/subscriptions`)
}
