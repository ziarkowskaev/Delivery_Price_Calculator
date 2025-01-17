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
            <div className="grid w-full max-w-sm items-center gap-1.5 text-neutral-800 my-4">
                <Label>Location</Label>
                
                <DynamicMap position={[60.1841, 24.8301]} zoom={17} />
            </div>
            <Button variant={"outline"} className="text-neutral-800">Get Live Location</Button>
        </div>
    )
}