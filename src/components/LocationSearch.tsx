import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "@radix-ui/react-label"
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import('./Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

export const LocationSearch = () => {
    return(
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="search_location">Search location</Label>
                <Input className="bg-stone-50" type="search" id="search_location" placeholder="Location" />
                <DynamicMap position={[51.505, -0.09]} zoom={17} />
            </div>
            <Button variant="outline">Get Live Location</Button>
        </div>
    )
}