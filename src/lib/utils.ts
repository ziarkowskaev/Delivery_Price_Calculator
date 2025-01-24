import { DistanceRange } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDeliveryFee = (
  distance: number,
  distanceRanges: DistanceRange[],
  deliveryBasePrice: number,
) => {
  for (const range of distanceRanges) {
    if ((distance > range.min && (range.max === 0 || distance <= range.max)||distance==0)) {
      return deliveryBasePrice + range.a + (range.b * distance) / 10;

    }
  }
};