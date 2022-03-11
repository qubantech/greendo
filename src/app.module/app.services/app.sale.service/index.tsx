import {useWatchedObject} from "../app.realtimedb.service";
import {Sale} from "../../app.models/models";

export function useSale(saleId: number) {
    return useWatchedObject<Sale>(`/sales/${saleId}`)
}

export function useSaleList() {
    return useWatchedObject<Array<Sale | null>>(`/sales`)
}
