type User = {
    userId: string,
    nickname: string | null,
    sex: "m" | "f",
    city: string | null,
    tokens: number,
    ownedSaleList: OwnedSale[],
    takeoutList: Takeout[],
    ownedSubscriptionList: OwnedSubscription[]
}

type Takeout = {
    takeoutId: number,
    userId: string,
    fundomateId: number
    timestamp: Date,
    trashTypeCountMap: Map<number, number>, // trashTypeId -> count
    trashTypePriceMap: Map<number, number> // trashTypeId -> price per unit
}

type TrashType = {
    trashTypeId: number,
    name: string,
    description: string,
    imageUrl: string
}

type Fundomate = {
    fundomateId: number,
    location: GeolocationCoordinates,
    trashTypeIdList: number[],
    takeoutList: Takeout[],
    capacityMap: Map<number, number> // trashTypeId -> filled [0..1]
}

type Sale = {
    saleId: number,
    brand: string,
    description: string,
    value: number,
    rules: string | null,
    ownedSaleList: OwnedSale[]
}

type OwnedSale = {
    saleId: number,
    userId: string,
    code: string
}

type Giveaway = {
    id: number,
    brand: string,
    description: string,
    timestamp: Date,
    rules: string,
    price: number,
    tickets: GiveawayTicket[]
}

type GiveawayTicket = {
    giveawayId: number,
    userId: string,
    boughtTime: Date
}

type Subscription = {
    subscriptionId: number,
    brand: string,
    description: string,
    minSum: number,
    maxSum: number,
    alreadyDonatingSum: number,
    alreadyDonationCount: number,
    ownedSubscriptionsList: OwnedSubscription[]
}

type OwnedSubscription = {
    subscriptionId: number,
    userId: string,
    sum: number,
    lastActionTimestamp: Date
}

type Code = {
    barCode: string,
    title: string,
    description: string,
    trashTypeId: number
}

export type {
    User,
    TrashType,
    OwnedSale,
    Sale,
    OwnedSubscription,
    Subscription,
    Giveaway,
    GiveawayTicket,
    Takeout,
    Fundomate,
    Code
};