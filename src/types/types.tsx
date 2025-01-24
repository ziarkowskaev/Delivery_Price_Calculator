export interface FormInput {
  venueSlug: string;
  cartValue: number;
  distance: number;
  orderMinimumNoSurcharge: number;
  distanceRanges: DistanceRange[];
  deliveryBasePrice: number;
  orderMinimum: number;
}

export interface Summary {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}

export interface DistanceRange {
  min: number;
  max: number;
  a: number;
  b: number;
  flag: null;
}

export interface VenueData {
  orderMinimumNoSurcharge: number;
  distanceRanges: DistanceRange[];
  deliveryBasePrice: number;
  orderMinimum: number;
  venueLatitude: number;
  venueLongitude: number;
}
