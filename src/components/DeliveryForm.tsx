import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { LocationSearch } from "./LocationSearch"

export const DeliveryForm = () => {
    return(
        <div>
            <div className="grid w-full max-w-m items-center gap-1.5">
                <Label htmlFor="venue">Venue</Label>
                <Input className="bg-stone-50" id="venue" placeholder="Venue" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="cart_value">Cart value</Label>
                <Input className="bg-stone-50" type="number" id="cart_value" placeholder="Value" />
            </div>
            <LocationSearch />
            <Button className="bg-stone-800">Calculate delivery price</Button>

        </div>
    )
}