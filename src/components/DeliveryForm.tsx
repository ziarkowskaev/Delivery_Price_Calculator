import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LocationSearch } from "./LocationSearch";
import { useFormDispatch, useFormValue } from "@/context/formContext";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { FormInput, VenueData } from "@/types/types";
import * as Yup from "yup";
import axios from "axios";
import { getDistance } from "geolib";

export const DeliveryForm = () => {
  const dispatch = useFormDispatch();
  const formData = useFormValue();
  const [venue, setVenue] = useState(formData.venueSlug);
  const [cartValue, setCartValue] = useState(formData.cartValue);
  const [userLongitude, setUserLongitude] = useState(24.82958);
  const [userLatitude, setUserLatitude] = useState(60.18527);

  const [venueData, setVenueData] = useState({
    orderMinimumNoSurcharge: 0,
    distanceRanges: [
      {
        min: 0,
        max: 500,
        a: 0,
        b: 0,
        flag: null,
      },
      {
        min: 500,
        max: 1000,
        a: 100,
        b: 1,
        flag: null,
      },
      {
        min: 1000,
        max: 0,
        a: 0,
        b: 0,
        flag: null,
      },
    ],
    deliveryBasePrice: 0,
    orderMinimum: 0,
    venueLatitude: 0,
    venueLongitude: 0,
  });

  useEffect(() => {
    axios
      .get(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/static`,
      )
      .then((response) => {
        setVenueData((prevData: VenueData) => ({
          ...prevData,
          orderMinimum: response.data
            ? response.data.order_minimum
            : prevData.orderMinimum,
          venueLatitude: response.data
            ? response.data.venue_raw.location.coordinates[1]
            : prevData.venueLatitude,
          venueLongitude: response.data
            ? response.data.venue_raw.location.coordinates[0]
            : prevData.venueLongitude,
        }));
      })
      .catch((error) => {
        console.log("Error fetching dynamic venue data:", error);
      });

    axios
      .get(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/dynamic`,
      )
      .then((response) => {
        setVenueData((prevData: VenueData) => ({
          ...prevData,
          orderMinimumNoSurcharge: response.data
            ? response.data.venue_raw.delivery_specs.order_minimum_no_surcharge
            : prevData.orderMinimumNoSurcharge,
          distanceRanges: response.data
            ? response.data.venue_raw.delivery_specs.delivery_pricing
                .distance_ranges
            : prevData.distanceRanges,
          deliveryBasePrice: response.data
            ? response.data.venue_raw.delivery_specs.delivery_pricing.base_price
            : prevData.deliveryBasePrice,
        }));
        console.log(venueData);
      })
      .catch((error) => {
        console.log("Error fetching dynamic venue data:", error);
      });
  }, [venue]);

  const distance = getDistance(
    { latitude: userLatitude, longitude: userLongitude },
    { latitude: venueData.venueLatitude, longitude: venueData.venueLongitude },
  );

  const DeliveryFormSchema = Yup.object().shape({
    venueSlug: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Provide venue information."),
    cartValue: Yup.number()
      .min(
        venueData.orderMinimum / 100,
        `Cart value must be at least €${venueData.orderMinimum / 100}`,
      )
      .required("Provide cart value."),
    userLatitude: Yup.number().min(-90).max(90).required("Provide latitude."),
    userLongitude: Yup.number()
      .min(-180)
      .max(180)
      .required("Provide longitude."),
    distance: Yup.number().test(
      "max-distance",
      `Delivery is not available for your location.`,
      function () {
        const maxDistance = Math.max(
          ...venueData.distanceRanges.map((range) => range.max || 0),
        );
        return distance <= maxDistance;
      },
    ),
  });

  const update = () => {
    dispatch({
      type: "SET_FORM_INPUT",
      payload: {
        venueSlug: venue,
        cartValue: cartValue,
        distance: distance,
        deliveryBasePrice: venueData.deliveryBasePrice,
        distanceRanges: venueData.distanceRanges,
        orderMinimumNoSurcharge: venueData.orderMinimumNoSurcharge,
      },
    });
  };

  const initialValues = {
    venueSlug: venue,
    cartValue: cartValue / 100,
    userLatitude: userLatitude,
    userLongitude: userLongitude,
  };

  console.log(formData);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
        validationSchema={DeliveryFormSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="grid w-full max-w-m items-center gap-1.5 text-neutral-800">
              <div>{errors.venueSlug}</div>

              <Label htmlFor="venue">Venue</Label>
              <Input
                name="venueSlug"
                className="bg-neutral-50"
                value={venue}
                id="venue"
                data-test-id="venueSlug"
                placeholder="Venue"
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 text-neutral-800 mt-2">
              <Label htmlFor="cart_value">Cart value EUR</Label>
              <Input
                name="cartValue"
                value={cartValue}
                className="bg-neutral-50"
                type="number"
                min={0}
                step=".01"
                id="cart_value"
                data-test-id="cartValue"
                placeholder="Cart value"
                onChange={(e) => setCartValue(Number(e.target.value) || 0)}
              />
            </div>
            <LocationSearch
              userLatitude={userLatitude}
              userLongitude={userLongitude}
              setUserLatitude={setUserLatitude}
              setUserLongitude={setUserLongitude}
            />
            <Button onClick={update} type="submit" className="mt-2">
              Calculate delivery price
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
