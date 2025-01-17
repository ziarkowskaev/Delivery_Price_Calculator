import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { LocationSearch } from "./LocationSearch"

export const DeliveryForm = () => {
    return(
        <div>
            <div className="grid w-full max-w-m items-center gap-1.5 text-neutral-800">
                <Label htmlFor="venue">Venue</Label>
                <Input className="bg-neutral-50" id="venue" placeholder="Venue" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 text-neutral-800 mt-2">
                <Label htmlFor="cart_value">Cart value</Label>
                <Input className="bg-neutral-50" type="number" min={0} id="cart_value" placeholder="Value" />
            </div>
            <LocationSearch />
            <Button className="mt-2">Calculate delivery price</Button>

        </div>
    )
}