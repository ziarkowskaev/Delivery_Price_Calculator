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

export interface Venue {
  orderMinimum: number;
  venueLatitude: number;
  venueLongitude: number;
  maxDistance: number;
  orderMinimumNoSurcharge: number;
  distanceRanges: DistanceRange[];
  deliveryBasePrice: number;
}

export interface DistanceRange {
  min: number;
  max: number;
  a: number;
  b: number;
  flag: null;
}
