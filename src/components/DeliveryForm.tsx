import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LocationSearch } from "./LocationSearch";
import { useFormDispatch, useFormValue } from "@/context/formContext";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { FormInput, VenueData } from "@/types/types";
import * as Yup from "yup";
import axios from "axios";
import { getDistance } from "geolib";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export const DeliveryForm = () => {
  const dispatch = useFormDispatch();
  const formData = useFormValue();
  const [venue, setVenue] = useState<string>(formData.venueSlug);
  const [cartValue, setCartValue] = useState<number>(formData.cartValue);
  const [userLatitude, setUserLatitude] = useState<number>(0);
  const [userLongitude, setUserLongitude] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [validDistance, setValidDistance] = useState<boolean>(true);
  const [validVenueSlug, setValidVenueSlug] = useState<boolean>(true);

  const [venueData, setVenueData] = useState<VenueData>({
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
    venueLatitude: 60.17094,
    venueLongitude: 24.93087,
  });

  useEffect(() => {
    axios
      .get(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/static`,
      )
      .then((response) => {
        setValidVenueSlug(true);
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
        setValidVenueSlug(false);
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
        setValidVenueSlug(true);
      })
      .catch((error) => {
        console.log("Error fetching dynamic venue data:", error);
        setValidVenueSlug(false);
      });
  }, [venue]);

  useEffect(() => {
    const distance = getDistance(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: venueData.venueLatitude,
        longitude: venueData.venueLongitude,
      },
    );
    setDistance(distance);

    if (
      distance >
      venueData.distanceRanges[venueData.distanceRanges.length - 1].min
    ) {
      setValidDistance(false);
    } else {
      setValidDistance(true);
    }
  }, [venue, userLatitude, userLongitude]);

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

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={(values) =>
          Yup.object().shape({
            venueSlug: Yup.string()
              .min(2, "Too Short!")
              .max(50, "Too Long!")
              .required("Provide venue information."),
            cartValue: Yup.number()
              .min(
                venueData.orderMinimum / 100 || 0,
                `Cart value must be at least ${venueData.orderMinimum / 100 || 0}€`,
              )
              .required("Provide cart value."),
            userLatitude: Yup.number()
              .min(-90)
              .max(90)
              .required("Provide latitude."),
            userLongitude: Yup.number()
              .min(-180)
              .max(180)
              .required("Provide longitude."),
          })
        }
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
      >
        {({ errors, isValid, touched }) => (
          <Form>
            <div className="grid w-full max-w-m items-center gap-1.5 text-neutral-800">
              <Label htmlFor="venue">Venue</Label>
              <Input
                name="venueSlug"
                className="bg-neutral-50"
                value={venue}
                id="venue"
                placeholder="Venue"
                onChange={(e) => setVenue(e.target.value)}
                data-test-id="venueSlug"
                data-raw-value="home-assignment-venue-helsinki"
              />
              {!validVenueSlug && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Provided venue slug is not in the database.
                  </AlertDescription>
                </Alert>
              )}
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
                placeholder="Cart value"
                onChange={(e) => setCartValue(Number(e.target.value) || 0)}
                data-test-id="cartValue"
                data-raw-value="1055"
              />
              {errors.cartValue && touched.cartValue && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Cart value is too small. Minimum value must be{" "}
                    {venueData.orderMinimum / 100}€.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <LocationSearch
              userLatitude={userLatitude}
              userLongitude={userLongitude}
              setUserLatitude={setUserLatitude}
              setUserLongitude={setUserLongitude}
            />
            {!validDistance && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Delivery not available in your location.
                </AlertDescription>
              </Alert>
            )}

            <Button
              disabled={!validDistance || (!validVenueSlug && isValid)}
              onClick={update}
              type="submit"
              className="mt-2"
              data-test-id="calculateDeliveryPrice"
            >
              Calculate delivery price
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
