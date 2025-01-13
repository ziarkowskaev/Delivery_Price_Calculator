import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import Image from "next/image"
import MapComponent from "./map"

export const LocationSearch = () => {
    return(
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="search_location">Search location</Label>
                <Input className="bg-stone-50" type="search" id="search_location" placeholder="Location" />
              <MapComponent />
            </div>
            <Button variant="outline">Get Live Location</Button>
        </div>
    )
}