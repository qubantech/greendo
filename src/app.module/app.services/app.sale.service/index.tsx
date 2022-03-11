// import {useWatchedObject} from "../app.realtimedb.service";
// import {OwnedSale, Sale} from "../../app.models/models";
// import {useUser} from "../app.user.service";
// import {getObject} from "../../app.configs/firebase-operations";
//
// export function useSale(saleId: number) {
//     return useWatchedObject<Sale>(`/sales/${saleId}`)
// }
//
// export function useSaleList() {
//     return useWatchedObject<Array<Sale | null>>(`/sales`)
// }
//
// export function useOrderSale(userId: number) {
//     const {watchedObject: user, setWatchedObject: setUser} = useUser(userId)
//     return (saleId: number) => getObject<Sale>(`/sales/${saleId}`)
//             .then(sale => {
//                 console.log(`${userId} ${saleId}`)
//                 if (user !== null && sale !== null) {
//                     if (user.tokens >= sale.price) {
//                         jose.importPKCS8(RTDB.JWT.pkcs8, RTDB.JWT.algorithm)
//                             .then(key => {
//
//                             })
//
//                         let ownedSale: OwnedSale = {
//                             code: "",
//                             saleId: sale.saleId,
//                             userId: user.userId
//                         }
//                         user.tokens -= sale.price
//                         if (user.ownedSaleList === undefined) {
//                             user.ownedSaleList = [ownedSale]
//                         } else {
//                             user.ownedSaleList.push(ownedSale)
//                         }
//
//                         if (sale.ownedSaleList === undefined) {
//                             sale.ownedSaleList = [ownedSale]
//                         } else {
//                             sale.ownedSaleList.push(ownedSale)
//                         }
//
//                         setUser(user)
//                         return Promise.resolve()
//                     }
//                 }
//                 return Promise.reject()
//             })
// }