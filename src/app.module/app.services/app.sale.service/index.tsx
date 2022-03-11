import {useWatchedObject} from "../app.realtimedb.service";
import {OwnedSale, Sale, User} from "../../app.models/models";
import {useUser} from "../app.user.service";
import {getObject, putObject} from "../../app.configs/firebase-operations";
import {decryptCode, encryptPayload} from "../app.jwt.service";

export function useSale(saleId: number) {
    return useWatchedObject<Sale>(`/sales/${saleId}`)
}

export function useSaleList() {
    return useWatchedObject<Array<Sale | null>>(`/sales`)
}

export function useOrderSale(userId: string) {
    const {watchedObject: user, setWatchedObject: setUser} = useUser(userId)
    return (saleId: number) => getObject<Sale>(`/sales/${saleId}`)
        .then(sale => {
                if (user !== null && sale !== null) {
                    if (user.ownedSaleList !== undefined && user.ownedSaleList.find(os=>os.saleId === saleId)) {
                        return Promise.reject()
                    }
                    if (user.tokens >= sale.price) {
                        const code = encryptPayload({
                            saleId: saleId,
                            userId: userId
                        })
                        let ownedSale: OwnedSale = {
                            code: code,
                            saleId: sale.saleId,
                            userId: user.userId
                        }
                        user.tokens -= sale.price
                        if (user.ownedSaleList === undefined) {
                            user.ownedSaleList = [ownedSale]
                        } else {
                            user.ownedSaleList.push(ownedSale)
                        }

                        if (sale.ownedSaleList === undefined) {
                            sale.ownedSaleList = [ownedSale]
                        } else {
                            sale.ownedSaleList.push(ownedSale)
                        }
                        setUser(user)
                        return Promise.resolve()
                    }
                }
                return Promise.reject()
            }
        )
}

export function spendOwnedSale(code: string) {
    const decryptedObj: { saleId: number, userId: string } = decryptCode(code)
    getObject<User>(`/users/${decryptedObj.userId}`)
        .then(user => {
                user.ownedSaleList = user.ownedSaleList.filter((os) => os.saleId !== decryptedObj.saleId)
                return putObject<User>(`/users/${decryptedObj.userId}`, user)
            }
        )
}