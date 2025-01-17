import { Label } from "@radix-ui/react-label"
import { PriceBreakdown } from "./PriceBreakdown"

export const Summary = () => {
    return(
        <div className="bg-neutral-900 rounded-xl text-neutral-100 px-20 py-12 mb-24">
            <h1 className="text-3xl text-center font-bold p-8 ">Total price</h1>
            <p className="text-4xl text-center font-bold ">11.90€</p>
            <PriceBreakdown />
        </div>
    )
}