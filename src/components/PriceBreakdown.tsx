import { useFormValue } from "@/context/formContext"
import { useSummaryValue } from "@/context/summaryContext";
import { Summary } from "@/types/types";
import {dynamicInfoVenue, staticInfoVenue } from "@/utils/utils";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from 'axios'
const geolib = require('geolib');
import { getDistance } from 'geolib';

interface DistanceRange{
    min: number,
    max: number,
    a: number,
    b: number,
    flag: null

}

interface VenueData{
    orderMinimumNoSurcharge: number,
    distanceRanges: DistanceRange[],
    basePrice: number,
    orderMinimum: number,
    venueLatitude: number,
    venueLongitude: number,
}

const calculateDeliveryFee = (distance: number, distanceRanges: DistanceRange[], basePrice: number) => {
    for (const range of distanceRanges) {
      if (distance > range.min && (range.max === 0 || distance <= range.max)) {
        return basePrice + range.a + (range.b * distance) / 10;
      }
    }
    throw new Error('Delivery not possible'); // Handle gracefully in calling function
  };

export const PriceBreakdown = ({setTotalPrice}) => {

    const [venueData, setVenueData] = useState({
        orderMinimumNoSurcharge: 0,
        distanceRanges: [
            {
              "min": 0,
              "max": 500,
              "a": 0,
              "b": 0,
              "flag": null
            },
            {
              "min": 500,
              "max": 1000,
              "a": 100,
              "b": 1,
              "flag": null
            },
            {
              "min": 1000,
              "max": 0,
              "a": 0,
              "b": 0,
              "flag": null
            }
          ],
        basePrice: 0,
        orderMinimum: 0,
        venueLatitude: 0,
        venueLongitude: 0,
    });


    const formData = useFormValue();
    const venueSlug = formData.venueSlug;

    const userLatitude = formData.userLatitude;
    const userLongitude = formData.userLongitude;

    const cartValue = formData.cartValue/100;

    //setTotalPrice(cartValue+smallOrderSurcharge+deliveryFee);

        
useEffect(()=>{
    axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`).then(response => {
                setVenueData((prevData:VenueData) => ({
                    ...prevData,
                    orderMinimum: response.data ? response.data.order_minimum : prevData.orderMinimum,
                    venueLatitude: response.data ? response.data.venue_raw.location.coordinates[1] : prevData.venueLatitude,
                    venueLongitude: response.data ? response.data.venue_raw.location.coordinates[0] : prevData.venueLongitude,
                }))
            })

    axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`).then(response => {
        setVenueData((prevData:VenueData) => ({
            ...prevData,
            orderMinimumNoSurcharge: response.data ? response.data.venue_raw.delivery_specs.order_minimum_no_surcharge: prevData.orderMinimumNoSurcharge,
              distanceRanges: response.data ? response.data.venue_raw.delivery_specs.delivery_pricing.distance_ranges : prevData.distanceRanges,
              basePrice:  response.data ? response.data.venue_raw.delivery_specs.delivery_pricing.base_price : prevData.basePrice,
        }))
    })
    

},[venueSlug])
        
     

      const distance = getDistance({latitude:userLatitude, longitude:userLongitude}, {latitude:venueData.venueLatitude, longitude:venueData.venueLongitude});
      const smallOrderSurcharge = (venueData.orderMinimumNoSurcharge - formData.cartValue) < 0 ? (venueData.orderMinimumNoSurcharge - formData.cartValue) : 0;
      const deliveryFee = calculateDeliveryFee(distance, venueData.distanceRanges, venueData.basePrice);
    
    
      console.log(venueData)
      setTotalPrice(cartValue+smallOrderSurcharge+deliveryFee)

    return(
        <div className="text-neural-200 ">
            <h2 className="text-xl text-center font-bold mt-12">Price Breakdown</h2>
            <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="text-center"><p>Cart value</p><p data-raw-value="1055">{cartValue}€</p></div>
                <div className="text-center"><p>Small order charge</p><p data-raw-value="0" >{smallOrderSurcharge}€</p></div>
                <div className="text-center"><p>Delivery distance</p><p data-raw-value="700">{distance}m</p></div>
                <div className="text-center"><p>Delivery Fee</p><p data-raw-value="190">{deliveryFee}€</p></div>
            </div>
        </div>
    )
}