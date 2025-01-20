import { useFormValue } from "@/context/formContext"
import { useSummaryValue } from "@/context/summaryContext";
import { Summary } from "@/types/types";
import { dynamicInfoVenue, staticInfoVenue } from "@/utils/utils";

import { Dispatch, SetStateAction } from "react";


export const PriceBreakdown = (setTotalPrice: any) => {

    //small order charge = order_minimum_no_surcharge - cart value

    //distance = straight line from user to venue

    //delivery fee = base_price + a + (b * distance / 10)

    const formData = useFormValue();
    const venueSlug = formData.venueSlug;
    const promiseStatic = staticInfoVenue(venueSlug);
    promiseStatic.then(response => console.log(response.data))
    const promiseDynamic = dynamicInfoVenue(venueSlug);

    const latitude = formData.userLatitude;
    const longitude = formData.userLongitude;


    const cartValue = formData.cartValue/100;
    const smallOrderSurcharge = (0 - formData.cartValue)/100;
    const distance = 0
    const deliveryFee = 0

    //setTotalPrice(cartValue+smallOrderSurcharge+deliveryFee);

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