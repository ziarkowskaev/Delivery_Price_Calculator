import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { LocationSearch } from "./LocationSearch"
import { useFormDispatch, useFormValue } from "@/context/formContext"
import { useState } from "react"
import { Formik,Field,Form } from 'formik';
import { FormInput } from "@/types/types"
import * as Yup from 'yup';
import { dynamicInfoVenue, staticInfoVenue } from "@/utils/utils"



export const DeliveryForm = () => {

    //if delivery is not possiblle, distance too long display error

    const dispatch = useFormDispatch();
    const formData = useFormValue()
    const [venue, setVenue]= useState(formData.venueSlug);
    const [cartValue, setCartValue] = useState(formData.cartValue);
    const [userLongitude, setUserLongitude] = useState(formData.userLongitude);
    const [userLatitude, setUserLatitude] = useState(formData.userLatitude);
    const [minimumOrderValue, setMinimumOrderValue] = useState(90);

    const promiseStatic = staticInfoVenue(venue);
    //promiseStatic.then(response => setMinimumOrderValue(response.data.order_minimum));
    const promiseDynamic = dynamicInfoVenue(venue);

    const DeliveryFormSchema = Yup.object().shape({
        venueSlug: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Provide venue information.'),
        cartValue: Yup.number()
          .min(minimumOrderValue, 'Cart value is to small!')
          .required('Provide cart value.'),
        userLatitude: Yup.number().min(-90).max(90).required('Provide latitude.'),
        userLongitude: Yup.number().min(-180).max(180).required('Provide longitude.'),
      });

    const initialValues: FormInput = { venueSlug: venue, cartValue: cartValue, userLatitude:userLatitude, userLongitude:userLongitude}
        
        return (
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                dispatch({
                    type: 'SET_FORM_INPUT',
                    payload: {venueSlug: venue, cartValue: cartValue, userLatitude: userLatitude, userLongitude: userLongitude}
                });
              }}
              validationSchema={DeliveryFormSchema}
            >
              <Form>
              <div className="grid w-full max-w-m items-center gap-1.5 text-neutral-800">
                <Label htmlFor="venue">Venue</Label>
                <Input name="venueSlug" className="bg-neutral-50" value={venue} id="venue" data-test-id="venueSlug" placeholder="Venue" onChange={(e) => setVenue(e.target.value)}/>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 text-neutral-800 mt-2">
                <Label htmlFor="cart_value">Cart value EUR</Label>
                <Input name="cartValue" className="bg-neutral-50" type="number" min={0} id="cart_value" data-test-id="cartValue" placeholder="Value" onChange={(e) => setCartValue(Number(e.target.value) || 0)}/>
            </div>
            <LocationSearch userLatitude={userLatitude} userLongitude={userLongitude} setUserLatitude={setUserLatitude} setUserLongitude={setUserLongitude}/>
            <Button type="submit" className="mt-2">Calculate delivery price</Button>
              </Form>
            </Formik>
          </div>
        );
       
}