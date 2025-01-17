interface FormInput {
    venueSlug: string;
    cartValue: number;
    userCoords: UserCoords;
}

interface UserCoords {
    userLatitude: number;
    userLongitude: number;
}

interface Summary {
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
}