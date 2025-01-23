import { useState } from "react";
import { DeliveryForm } from "../components/DeliveryForm";
import { Summary } from "../components/Summary";

import axios from "axios";
import { VenueContextProvider } from "@/context/venueContext";
import FormContext, { FormContextProvider } from "@/context/formContext";

export default function Home() {
  return (
    <div>
      <main>
        <div className="bg-neutral-100 m-20 rounded-xl">
          <h1 className="text-3xl text-center font-bold pt-8 text-neutral-800">
            Delivery Order Price Calculator
          </h1>
          <div className="flex flex-row justify-around m-16">
            <FormContextProvider>
              <VenueContextProvider>
                <DeliveryForm />
                <Summary />
              </VenueContextProvider>
            </FormContextProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
