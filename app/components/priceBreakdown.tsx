import { Label } from "@radix-ui/react-label"

export const PriceBreakdown = () => {
    return(
        <div className="text-stone-200 ">
            <h2 className="text-xl text-center font-bold mt-12">Price Breakdown</h2>
            <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="text-center"><p>Cart value</p><p>10.00€</p></div>
                <div className="text-center"><p>Small order charge</p><p>0.00€</p></div>
                <div className="text-center"><p>Delivery distance</p><p>177m</p></div>
                <div className="text-center"><p>Delivery Fee</p><p>1.90€</p></div>
            </div>
        </div>
    )
}