import { useState } from "react";
import { DeliveryForm } from "../components/DeliveryForm";
import { Summary } from "../components/Summary";

import axios from "axios";
import FormContext, { FormContextProvider } from "@/context/formContext";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <h1 className="text-3xl text-center font-bold pt-8 text-neutral-800">
            Delivery Order Price Calculator
          </h1>
          <div className="flex items-center justify-around m-12">
            <FormContextProvider>
              <DeliveryForm />
              <Summary />
            </FormContextProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
