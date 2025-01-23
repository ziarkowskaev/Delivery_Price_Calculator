import { useFormValue } from "@/context/formContext";
import { DistanceRange, Summary, Venue } from "@/types/types";
import { dynamicInfoVenue, staticInfoVenue } from "@/utils/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
const geolib = require("geolib");
import { getDistance } from "geolib";
import { Info } from "lucide-react";
import { useVenueValue } from "@/context/venueContext";

const calculateDeliveryFee = (
  distance: number,
  distanceRanges: DistanceRange[],
  basePrice: number,
) => {
  for (const range of distanceRanges) {
    if (distance > range.min && (range.max === 0 || distance <= range.max)) {
      return basePrice + range.a + (range.b * distance) / 10;
    }
  }
  throw new Error("Delivery not possible"); // Handle gracefully in calling function
};

export const PriceBreakdown = ({ setTotalPrice }) => {

  const venueData = useVenueValue();

  const formData = useFormValue();
  const venueSlug = formData.venueSlug;

  const userLatitude = formData.userLatitude;
  const userLongitude = formData.userLongitude;

  const cartValue = formData.cartValue / 100;

  console.log(venueData.orderMinimumNoSurcharge);
  console.log(formData.cartValue);

  const distance = getDistance(
    { latitude: userLatitude, longitude: userLongitude },
    { latitude: venueData.venueLatitude, longitude: venueData.venueLongitude },
  );
  const smallOrderSurcharge =
    formData.cartValue - venueData.orderMinimumNoSurcharge < 0
      ? (venueData.orderMinimumNoSurcharge - formData.cartValue) / 100
      : 0;
  const deliveryFee = calculateDeliveryFee(
    distance,
    venueData.distanceRanges,
    venueData.deliveryBasePrice,
  );

  console.log(venueData);
  setTotalPrice(cartValue + smallOrderSurcharge + deliveryFee / 100);

  return (
    <div className="text-neural-200 ">
      <h2 className="text-xl text-center font-bold mt-12">Price Breakdown</h2>
      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="text-center">
          <p>Cart value</p>
          <p data-raw-value="1055">{cartValue}€</p>
        </div>
        <div className="text-center">
          <HoverCard>
            <HoverCardTrigger className="decoration-white">
              <div className="flex gap-2">
                <Info />
                <p>Small order surcharge</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The minimum cart value to avoid small order surcharge{" "}
              {venueData.orderMinimumNoSurcharge / 100} EUR.
            </HoverCardContent>
          </HoverCard>
          <p data-raw-value="0">{smallOrderSurcharge}€</p>
        </div>
        <div className="text-center">
          <p>Delivery distance</p>
          <p data-raw-value="700">{distance}m</p>
        </div>
        <div className="text-center">
          <p>Delivery Fee</p>
          <p data-raw-value="190">{deliveryFee / 100}€</p>
        </div>
      </div>
    </div>
  );
};
