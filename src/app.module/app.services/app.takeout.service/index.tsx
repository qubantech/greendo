import {useWatchedObject} from "../app.realtimedb.service";
import {Fundomate, Takeout} from "../../app.models/models";
import {decryptCode} from "../app.jwt.service";
import {useUser} from "../app.user.service";
import {getObject, putObject} from "../../app.configs/firebase-operations";

export function useTakeout(takeoutId: number) {
    return useWatchedObject<Takeout>(`/takeouts/${takeoutId}`)
}

export function useTakeoutList() {
    return useWatchedObject<Array<Takeout | null>>(`/takeouts`)
}

export function useHandleTakeoutCode(userId: string) {
    const {watchedObject: user, setWatchedObject: setUser} = useUser(userId)
    return (code: string) => {
        let obj: object;
        try {
           obj = decryptCode(code)
        } catch (e) {
            return Promise.reject()
        }
        // @ts-ignore
        return getObject<Fundomate>(`/fundomates/${obj.fundomateId}`)
            .then(fundomate => {
                if (user !== null) {
                    // @ts-ignore
                    if (user.takeoutList === undefined || user.takeoutList.filter(item => item.timestamp === obj.timestamp).length !== 0) {
                        return Promise.reject()
                    }

                    const t: Takeout = {
                        // @ts-ignore
                        fundomateId: obj.fundomateId,
                        takeoutId: Math.round(Math.random() * 1000),
                        // @ts-ignore
                        timestamp: obj.timestamp,
                        // @ts-ignore
                        trashTypeCountMap: obj.thrown,
                        trashTypePriceMap: fundomate.priceMap,
                        userId: user.userId
                    }
                    if (user.takeoutList === undefined) {
                        user.takeoutList = [t]
                    } else {
                        user.takeoutList.push(t)
                    }

                    for (let typeIndex = 0; typeIndex < 13; typeIndex++) {
                        if (t.trashTypeCountMap.hasOwnProperty(typeIndex)) {
                            user.tokens += t.trashTypeCountMap[typeIndex] * t.trashTypePriceMap[typeIndex]
                        }
                    }
                    // @ts-ignore
                    fundomate.capacityMap = obj.filled
                    setUser(user)
                    // @ts-ignore
                    return putObject<Fundomate>(`/fundomates/${obj.fundomateId}`, fundomate)
                }
                return Promise.reject()
            })
    }
}