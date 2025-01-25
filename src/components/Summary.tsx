import { PriceBreakdown } from "./PriceBreakdown";
import { useState } from "react";

export const Summary = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="bg-neutral-900 rounded-xl text-neutral-100 px-20 py-24 mb-24">
      <h1 className="text-3xl text-center font-bold p-8 ">Total price</h1>
      <p className="text-4xl text-center font-bold ">{totalPrice}€</p>
      <PriceBreakdown setTotalPrice={setTotalPrice} />
    </div>
  );
};
