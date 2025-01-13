import { Label } from "@radix-ui/react-label"
import { PriceBreakdown } from "./priceBreakdown"

export const Summary = () => {
    return(
        <div className="bg-stone-800 rounded-xl text-stone-200 px-24 py-12 mb-24">
            <h1 className="text-3xl text-center font-bold p-8 ">Total price</h1>
            <p className="text-4xl text-center font-bold ">11.90€</p>
            <PriceBreakdown />
        </div>
    )
}