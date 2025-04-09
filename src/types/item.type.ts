export interface Items {
    "_id": string,
    "name": string,
    "category"?: string,
    "image": string,
    "description"?: string,
    "price": number,
    "total"?: number,
    "quantity"?: number,
    "categoryDetails"?: {
        "_id": string;
        "name": string
    },
    "cartTotal"?: number
}

export interface cartState {
    items: Items[];
    isLoggedIn: false;
    cartTotal: number;
}