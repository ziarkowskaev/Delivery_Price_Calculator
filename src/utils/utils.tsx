import { useVenueDispatch, useVenueValue } from "@/context/venueContext";
import { Venue } from "@/types/types";
import axios from "axios";

export const staticInfoVenue = async (venueSlug: string) => {
  const promise = axios.get(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`,
  );
  return promise;
};

export const dynamicInfoVenue = (venueSlug: string) => {
  const promise = axios.get(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`,
  );
  return promise;
};

export const getVenueData = (venueSlug: string, ) =>{

  const dispatch = useVenueDispatch();
  const venueData = useVenueValue();

  axios
      .get(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`,
      )
      .then((response) => {
        dispatch({type: "SET_VENUE",
        payload: {
          ...venueData,
          orderMinimum: response.data
            ? response.data.order_minimum
            : venueData.orderMinimum,
          venueLatitude: response.data
            ? response.data.venue_raw.location.coordinates[1]
            : venueData.venueLatitude,
          venueLongitude: response.data
            ? response.data.venue_raw.location.coordinates[0]
            : venueData.venueLongitude,
        }});
        console.log(venueData);
      })
      .catch(((error) => {
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }));

    axios
      .get(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`,
      )
      .then((response) => {
        dispatch({type: "SET_VENUE",
        payload: {
          ...venueData,
          orderMinimumNoSurcharge: response.data
            ? response.data.venue_raw.delivery_specs.order_minimum_no_surcharge
            : venueData.orderMinimumNoSurcharge,
          distanceRanges: response.data
            ? response.data.venue_raw.delivery_specs.delivery_pricing
                .distance_ranges
            : venueData.distanceRanges,
          deliveryBasePrice: response.data
            ? response.data.venue_raw.delivery_specs.delivery_pricing.base_price
            : venueData.deliveryBasePrice,
        }});
      })
      .catch(((error) => {
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }));
  
}