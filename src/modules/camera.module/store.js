import {makeAutoObservable} from "mobx";

export const cameraStore = () => {
    const store = {
        filled: {0: 0.0, 1: 0.0, 3: 0.0, 8: 0.0},
        /*volume:{0: 0.025, 1: 0.025, 3: 0.05, 8: 0.01},
        localAdd: {0: 0.0, 1: 0.0, 3: 0.0, 8: 0.0},
        req: {}*/
    }

    return makeAutoObservable(store)

}