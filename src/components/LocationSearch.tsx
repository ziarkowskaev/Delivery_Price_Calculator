import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import dynamic from "next/dynamic";

interface UserCoords {
  userLatitude: number;
  setUserLatitude: any;
  userLongitude: number;
  setUserLongitude: any;
}

const DynamicMap = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export const LocationSearch = ({
  userLatitude,
  setUserLatitude,
  userLongitude,
  setUserLongitude,
}: UserCoords) => {
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLongitude(longitude);
          setUserLatitude(latitude);
        },
        (error) => {
          alert(
            "Geolocation is not supported by this browser, provide coordinates manualy.",
          );
        },
      );
    } else {
      alert(
        "Geolocation is not supported by this browser, provide coordinates manualy.",
      );
    }
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center text-neutral-800 my-4">
        <div>
          <div>
            <Label htmlFor="latitude" className="text-right">
              User Latitude
            </Label>
            <Input
              id="latitude"
              className="bg-neutral-50"
              type="number"
              value={userLatitude}
              onChange={(e) => setUserLatitude(Number(e.target.value) || 0)}
              step="0.0001"
            />
          </div>
          <div>
            <Label htmlFor="longitude" className="text-right">
              User Longitude
            </Label>
            <Input
              id="longitude"
              className="bg-neutral-50"
              type="number"
              value={userLongitude}
              onChange={(e) => setUserLongitude(Number(e.target.value) || 0)}
              step="0.0001"
            />
          </div>
        </div>
        <DynamicMap position={[userLatitude, userLongitude]} zoom={17} />
      </div>
      <Button
        variant={"outline"}
        type="button"
        onClick={getUserLocation}
        className="text-neutral-800"
        data-test-id="getLocation"
      >
        Get Live Location
      </Button>
    </div>
  );
};
