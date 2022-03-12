type User = {
    userId: string,
    nickname: string | null,
    sex: "m" | "f",
    city: string | null,
    tokens: number,
    level: number,
    ownedSaleList: OwnedSale[],
    takeoutList: Takeout[],
    ownedSubscriptionList: OwnedSubscription[]
}

type Takeout = {
    takeoutId: number,
    userId: string,
    fundomateId: number
    timestamp: number,
    trashTypeCountMap: {[count: number]: number}, //Map<number, number>, // trashTypeId -> count
    trashTypePriceMap: {[price: number]: number} // trashTypeId -> price per unit
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
    capacityMap: {[capacity: number]: number} // trashTypeId -> filled [0..1]
}

type Container = {
    containerId: number,
    location: GeolocationCoordinates,
    trashTypeIdList: number[],
    title: string,
    address: string,
    description: string,
}

type Sale = {
    saleId: number,
    brand: string,
    description: string,
    value: number,
    price: number,
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
    timestamp: number,
    rules: string,
    price: number,
    tickets: GiveawayTicket[]
}

type GiveawayTicket = {
    giveawayId: number,
    userId: string,
    boughtTime: number
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
    lastActionTimestamp: number
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
    Container,
    Sale,
    OwnedSubscription,
    Subscription,
    Giveaway,
    GiveawayTicket,
    Takeout,
    Fundomate,
    Code
};