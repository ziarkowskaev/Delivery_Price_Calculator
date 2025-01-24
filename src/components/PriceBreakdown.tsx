import { useFormValue } from "@/context/formContext";
import { useSummaryValue } from "@/context/summaryContext";
import { DistanceRange, Summary} from "@/types/types";
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
import { Info } from 'lucide-react';
import { calculateDeliveryFee } from "@/lib/utils";

export const PriceBreakdown = ({ setTotalPrice }) => {

  const formData = useFormValue();


  const smallOrderSurcharge =
    formData.cartValue*100 - formData.orderMinimumNoSurcharge < 0
      ? (formData.orderMinimumNoSurcharge - formData.cartValue*100) / 100
      : 0;

  const deliveryFee = calculateDeliveryFee(
    formData.distance,
    formData.distanceRanges,
    formData.deliveryBasePrice,
  );

  setTotalPrice((formData.cartValue + smallOrderSurcharge + deliveryFee/100));

  return (
    <div className="text-neural-200 ">
      <h2 className="text-xl text-center font-bold mt-12">Price Breakdown</h2>
      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="text-center">
          <p>Cart value</p>
          <p data-raw-value="1055">{formData.cartValue}€</p>
        </div>
        <div className="text-center">
          <HoverCard>
            <HoverCardTrigger className="decoration-white"><div className="flex gap-2"><Info/><p>Small order surcharge</p></div></HoverCardTrigger>
            <HoverCardContent>
            The minimum cart value to avoid small order surcharge {formData.orderMinimumNoSurcharge/100} EUR.
            </HoverCardContent>
          </HoverCard>
          <p data-raw-value="0">{smallOrderSurcharge}€</p>
        </div>
        <div className="text-center">
          <p>Delivery distance</p>
          <p data-raw-value="700">{formData.distance}m</p>
        </div>
        <div className="text-center">
          <p>Delivery Fee</p>
          <p data-raw-value="190">{deliveryFee/100}€</p>
        </div>
      </div>
    </div>
  );
};
