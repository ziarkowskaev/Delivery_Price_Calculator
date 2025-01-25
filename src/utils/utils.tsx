import { DistanceRange } from "@/types/types";

export const calculateDeliveryFee = (
  distance: number,
  distanceRanges: DistanceRange[],
  deliveryBasePrice: number,
) => {
  for (const range of distanceRanges) {
    if (
      (distance > range.min && (range.max === 0 || distance <= range.max)) ||
      distance == 0
    ) {
      return deliveryBasePrice + range.a + (range.b * distance) / 10;
    }
  }
  return 0;
};
