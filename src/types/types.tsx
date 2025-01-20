export interface FormInput {
    venueSlug: string;
    cartValue: number;
    userLatitude: number;
    userLongitude: number;
}

export interface Summary {
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
}

