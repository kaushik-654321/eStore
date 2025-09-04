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
    "cartTotal"?: number,
    "product"?: {
        "_id": string;
        "name": string;
        "image": string;
        "price": number;
    };
}

export interface cartState {
    items: Items[];
    isLoggedIn: false;
    cartTotal: number;
    cartCount: number
}

export interface fetchUserCartPayload {
    userId: string;
    token: string;
}
interface cartItemsInput {
    _id: string;
    quantity?: number;
}
export interface addToCartPayload {
    userId: string;
    token: string;
    cartItems: cartItemsInput[];
    sync?: boolean;
}

export interface tabDataType {
    _id: string;
    name: string
}

export interface tabContentData {
    _id: string,
    name: string,
    category: string,
    image: string,
    description: string,
    price: number
}
