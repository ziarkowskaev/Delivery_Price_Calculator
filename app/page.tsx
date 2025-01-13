import Image from "next/image";
import { DeliveryForm } from "./components/deliveryForm";
import { Summary } from "./components/summary";

export default function Home() {
  return (
    <div>
      <main>
        <div className="bg-stone-200 m-20 rounded-xl"> 
        <h1 className="text-3xl text-center font-bold pt-8">Delivery Order Price Calculator</h1>
        <div className="flex flex-row justify-between m-16">
          <DeliveryForm />
          <Summary />
        </div>
        </div>
      </main>
    </div>
  );
}